'use strict';

var computeIQR = require('compute-iqr');

/**
 * Calculates the values required to draw a histogram based on the input array and the number of bins.
 * Tails can be removed by limiting the calculation to a specific percentile.
 * The number of bins can be automatically calculated using a heuristic.
 *
 * @param arr
 * @param numBins If numBins === 0, then max of the Sturges and Freedman–Diaconis' choice methods is used
 *        See: https://en.wikipedia.org/wiki/Histogram
 * @param trimTailPercentage removes the right and left tails from the distribution
 * @returns Array Two dimensional array. First dimension is the index of the bin, and the second index
 *          is the count. This allows for direct import into ChartJS without having to change the data shape
 */
function calculateHistogram(arr) {
    var numBins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var trimTailPercentage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.00;

    var dataCopy = arr.sort(function (a, b) {
        return a - b;
    });

    if (trimTailPercentage !== 0.00) {
        var rightPercentile = dataCopy[Math.floor((1.0 - trimTailPercentage) * dataCopy.length - 1)];
        var leftPercentile = dataCopy[Math.ceil(trimTailPercentage * dataCopy.length - 1)];
        dataCopy = dataCopy.filter(function (x) {
            return x <= rightPercentile && x >= leftPercentile;
        });
    }

    var min = dataCopy[0];
    var max = dataCopy[dataCopy.length - 1];

    if (numBins === 0) {
        var sturges = Math.ceil(Math.log2(dataCopy.length)) + 1;
        var iqr = computeIQR(dataCopy);
        // If IQR is 0, fd returns 1 bin. This is as per the NumPy implementation:
        //   https://github.com/numpy/numpy/blob/master/numpy/lib/histograms.py#L138
        var fdbins = 1;
        if (iqr !== 0.0) {
            var fd = 2.0 * (iqr / Math.pow(dataCopy.length, 1.0 / 3.0));
            fdbins = Math.ceil((max - min) / fd);
        }
        numBins = Math.max(sturges, fdbins);
    }
    var bins = new Array(numBins ? numBins : 0).fill([0, 0]).map(function (_, i) {
        return [i, 0];
    });

    var binSize = (max - min) / numBins === 0 ? 1 : (max - min) / numBins;
    dataCopy.forEach(function (item) {
        var binIndex = Math.floor((item - min) / binSize);
        // for values that lie exactly on last bin we need to subtract one
        if (binIndex === numBins) {
            binIndex--;
        }
        bins[binIndex][1]++;
    });

    return bins;
}
module.exports = calculateHistogram;
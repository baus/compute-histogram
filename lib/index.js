const computeIQR = require('compute-iqr');

/**
 * Calculates the values required to draw a histogram based on the input array and the number of buckets.
 * Tails can be removed by limiting the calculation to a specific percentile.
 * The number of buckets can be automatically calculated using a heuristic.
 *
 * @param arr
 * @param numBuckets If numBuckets === 0, then max of the Sturges and Freedman–Diaconis' choice methods is used
 *        See: https://en.wikipedia.org/wiki/Histogram
 * @param trimTailPercentage removes the right and left tails from the distribution
 * @returns Array Two dimensional array. First dimension is the index of the bucket, and the second index
 *          is the count. This allows for direct import into ChartJS without having to change the data shape
 */
function calculateHistogram(arr, numBuckets = 0, trimTailPercentage = 0.00) {
    const buckets = [];

    let dataCopy = arr.sort((a, b) => a - b);

    if (trimTailPercentage !== 0.00) {
        const rightPercentile = dataCopy[Math.floor((1.0 - trimTailPercentage) * dataCopy.length - 1)];
        const leftPercentile = dataCopy[Math.ceil(trimTailPercentage * dataCopy.length - 1)];
        dataCopy = dataCopy.filter(x => x <= rightPercentile && x >= leftPercentile);
    }

    const min = dataCopy[0];
    const max = dataCopy[dataCopy.length - 1];

    if(numBuckets === 0){
        const sturges = Math.ceil(Math.log2(dataCopy.length)) + 1;
        const iqr = computeIQR(dataCopy);
        const fd =  2.0 * (iqr / Math.pow(dataCopy.length, (1.0 / 3.0)));
        const fdbuckets = Math.ceil((max - min) / fd);
        numBuckets = Math.max(sturges, fdbuckets);
    }
    for (let i = 0; i < numBuckets; i++) {
        buckets.push([i, 0]);
    }


    const bucketSize = (max - min) / numBuckets === 0 ? 1 : (max - min) / numBuckets;
    dataCopy.forEach(item => {
        let bucketIndex = Math.floor((item - min) / bucketSize);
        // for values that lie exactly on last bucket we need to subtract one
        if (bucketIndex === numBuckets) {
            bucketIndex--;
        }
        buckets[bucketIndex][1]++;
    });

    return buckets;
}
module.exports = calculateHistogram;

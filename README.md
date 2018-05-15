Compute Histogram
===

> Computes [histogram](https://en.wikipedia.org/wiki/Histogram) bins for an array of values.


## Installation

``` bash
$ npm install compute-histogram
```

## Usage

To use the module,

``` javascript
var computeHistogram = require( 'compute-histogram' );
```


#### computeHistogram(arr)

Computes the histogram for the provided input `array`. Returns a two dimensional array. The first dimension is the bin 
index. The second dimension is the number of items in the bin.

``` javascript
var arr = [ 8, 2, 3, 9, 5, 1, 4, 10, 7, 0, 6 ];

var r = computeHistogram(arr);
// [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 3 ] ]
```


#### computeHistogram(arr, numBins)
If numBins isn't specified or is set to zero, the number of bins is automatically
computed using the maximum of the [Sturges](https://en.wikipedia.org/wiki/Histogram#Sturges'_formula) and 
[Freedman–Diaconis' choice](https://en.wikipedia.org/wiki/Histogram#Freedman%E2%80%93Diaconis'_choice) methods is used.

Otherwise the histogram for the provided input `array` and binSize is computed. 

``` javascript
var arr = [ 8, 2, 3, 9, 5, 1, 4, 10, 7, 0, 6 ];

var r = computeHistogram(arr, 5);
// [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 3 ] ]
```
#### computeHistogram(arr, numBins, trimTailPercentage)

Computes the histogram for the provided input `array` and `binSize`. This also trims a percertage from each
end of the distribution using `trimTailPercentage` to allow filtering of outliers.

``` javascript
var arr = [ 8, 2, 3, 9, 5, 1, 4, 10, 7, 0, 6 ];

var r = computeHistogram(arr, 5, .05);
// [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ] ]
```

## Notes

The automatic bin size heuristic is based on NumPy's 
[implementation](https://docs.scipy.org/doc/numpy-1.14.0/reference/generated/numpy.histogram.html)

## License

[MIT license](http://opensource.org/licenses/MIT). 

---
## Copyright

Copyright &copy; 2018. Christopher Baus.

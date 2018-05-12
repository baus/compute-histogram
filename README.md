Compute Histogram
===

> Computes [histogram](https://en.wikipedia.org/wiki/Histogram) buckets for an array of values.


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

Computes the histogram for the provided input `array`.

``` javascript
var arr = [ 8, 2, 3, 9, 5, 1, 4, 10, 7, 0, 6 ];

var r = computeHistogram(arr);
// Returns a two dimensional array. 
// The first dimension is the bucket index.
// The second dimension is the number of items in the bucket.
// [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 3 ] ]
```

If numBuckets isn't specified or is set to zero, the number of buckets is automatically
computed using the maximum of the [Sturges](https://en.wikipedia.org/wiki/Histogram#Sturges'_formula) and 
[Freedman–Diaconis' choice](https://en.wikipedia.org/wiki/Histogram#Freedman%E2%80%93Diaconis'_choice) methods is used

#### computeHistogram(arr, numBuckets)

Computes the histogram for the provided input `array` and bucketSize. If bucket size is zero then use automatic bucket 
sizing.
``` javascript
var arr = [ 8, 2, 3, 9, 5, 1, 4, 10, 7, 0, 6 ];

var r = computeHistogram(arr, 5);
// [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 3 ] ]
```
#### computeHistogram(arr, numBuckets, trimTailPercentage)

Computes the histogram for the provided input `array` and bucketSize. This also trims a percertage off of each
end of the distribution to allow filtering of outliers.

``` javascript
var arr = [ 8, 2, 3, 9, 5, 1, 4, 10, 7, 0, 6 ];

var r = computeHistogram(arr, 5, .05);
// [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ] ]
```

## Notes

The automatic bucket size heuristic is based on NumPy's 
[implementation](https://docs.scipy.org/doc/numpy-1.14.0/reference/generated/numpy.histogram.html)

## License

[MIT license](http://opensource.org/licenses/MIT). 

---
## Copyright

Copyright &copy; 2018. Christopher Baus.

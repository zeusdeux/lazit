/* jshint esnext:true */

// fn ops
var flip      = require('./esnext/flip');

// generic list ops pt 1
var map       = require('./esnext/map');
var concat    = require('./esnext/concat');
var filter    = require('./esnext/filter');
var head      = require('./esnext/head');
var last      = require('./esnext/last');
var tail      = require('./esnext/tail');
var init      = require('./esnext/init');
var reverse   = require('./esnext/reverse');

// folds
var foldl     = require('./esnext/foldl');
var foldl1    = require('./esnext/foldl1');
var foldr     = require('./esnext/foldr');
var foldr1    = require('./esnext/foldr1');

// scans
var scanl     = require('./esnext/scanl');
var scanl1    = require('./esnext/scanl1');
var scanr     = require('./esnext/scanr');
// var scanr1 = require('./esnext/scanr1');

// infinite lists
var iterate   = require('./esnext/iterate');
var repeat    = require('./esnext/repeat');
var replicate = require('./esnext/replicate');
var cycle     = require('./esnext/cycle');

// generic list ops pt 2
var take      = require('./esnext/take');
var drop      = require('./esnext/drop');
var splitAt   = require('./esnext/splitAt');
var takeWhile = require('./esnext/takeWhile');
var dropWhile = require('./esnext/dropWhile');
var span      = require('./esnext/span');
var spanInv   = require('./esnext/spanInv');

// zips
var zip       = require('./esnext/zip');
var zip3      = require('./esnext/zip3');
var zipN      = require('./esnext/zipN');
var zipWith   = require('./esnext/zipWith');
var zipWith3  = require('./esnext/zipWith3');
var zipWithN  = require('./esnext/zipWithN');

// unzips
var unzip     = require('./esnext/unzip');
var unzipN    = require('./esnext/unzipN');
var unzip3    = require('./esnext/unzip3');

module.exports = {
  flip: flip,
  map: map,
  concat: concat,
  filter: filter,
  head: head,
  last: last,
  tail: tail,
  init: init,
  reverse: reverse,
  foldl: foldl,
  foldl1: foldl1,
  foldr: foldr,
  foldr1: foldr1,
  scanl: scanl,
  scanl1: scanl1,
  scanr: scanr,
// scanr1: scanr1,
  take: take,
  drop: drop,
  splitAt: splitAt,
  takeWhile: takeWhile,
  dropWhile: dropWhile,
  span: span,
  spanInv: spanInv,
  zip: zip,
  zip3: zip3,
  zipWith: zipWith,
  zipWith3: zipWith3,
  zipN: zipN,
  zipWithN: zipWithN,
  unzip: unzip,
  unzip3: unzip3,
  unzipN: unzipN,
  iterate: iterate,
  repeat: repeat,
  replicate: replicate,
  cycle: cycle
};

/* jshint esnext:true */

// fn ops
let flip      = require('./esnext/flip');

// generic list ops pt 1
let map       = require('./esnext/map');
let concat    = require('./esnext/concat');
let filter    = require('./esnext/filter');
let head      = require('./esnext/head');
let last      = require('./esnext/last');
let tail      = require('./esnext/tail');
let init      = require('./esnext/init');
let reverse   = require('./esnext/reverse');

// folds
let foldl     = require('./esnext/foldl');
let foldl1    = require('./esnext/foldl1');
let foldr     = require('./esnext/foldr');
let foldr1    = require('./esnext/foldr1');

// scans
let scanl     = require('./esnext/scanl');
let scanl1    = require('./esnext/scanl1');
let scanr     = require('./esnext/scanr');
// let scanr1 = require('./esnext/scanr1');

// infinite lists
let iterate   = require('./esnext/iterate');
let repeat    = require('./esnext/repeat');
let replicate = require('./esnext/replicate');
let cycle     = require('./esnext/cycle');

// generic list ops pt 2
let take      = require('./esnext/take');
let drop      = require('./esnext/drop');
let splitAt   = require('./esnext/splitAt');
let takeWhile = require('./esnext/takeWhile');
let dropWhile = require('./esnext/dropWhile');
let span      = require('./esnext/span');
let spanInv   = require('./esnext/spanInv');

// zips
let zip       = require('./esnext/zip');
let zip3      = require('./esnext/zip3');
let zipN      = require('./esnext/zipN');
let zipWith   = require('./esnext/zipWith');
let zipWith3  = require('./esnext/zipWith3');
let zipWithN  = require('./esnext/zipWithN');

// unzips
let unzip     = require('./esnext/unzip');
let unzipN    = require('./esnext/unzipN');
let unzip3    = require('./esnext/unzip3');

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

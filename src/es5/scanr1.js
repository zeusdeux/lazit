"use strict";

//var cu = require('auto-curry');

// fix this implementation ffs
// scanr1 :: (a -> a -> a) -> [a] -> [a]
// function scanr1(f, xs){
//   var itObj = xs[Symbol.iterator]().next();
//   if (itObj.done) return [];
//   else return _scanr1(f, itObj.value, xs[Symbol.iterator]());

//   function _scanr1(_f, _b, _aIt) {
//     let _aObj = _aIt.next();
//     if (_aObj.done) return _b;
//     let ys = _scanr1(_f, _b, _aIt);
//     if (Array.isArray(ys)) ys.unshift(_f(_aObj.value, ys[0]));
//     else {
//       let temp = [];
//       temp.push(_f(_aObj.value, ys));
//       ys = temp;
//     }
//     return ys;
//   }
// }

//module.exports = cu(scanr1);
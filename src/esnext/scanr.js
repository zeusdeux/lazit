let clone    = require('clone');
let cu       = require('auto-curry');
let isObject = require('./util').isObject;


// scanr :: (a -> b -> b) -> b -> [a] -> [b]
function scanr(f, acc, xs) {
  let xsIt = xs[Symbol.iterator]();

  return _scanr(f, acc, xsIt);

  function _scanr(_f, _b, _aIt) {
    let _aObj = _aIt.next();
    let ys;

    if (_aObj.done) return [_b];
    ys = _scanr(_f, _b, _aIt);
    ys.unshift(_f(_aObj.value, isObject(ys[0])? clone(ys[0]) : ys[0]));
    return ys;
  }
}

module.exports = cu(scanr);

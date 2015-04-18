let clone    = require('clone');
let cu       = require('auto-curry');
let isObject = require('./util').isObject;


// foldr :: (a -> b -> b) -> b -> [a] -> b
function foldr(f, acc, xs) {
  let xsIt = xs[Symbol.iterator]();

  acc = isObject(acc)? clone(acc) : acc;
  return _foldr(f, acc, xsIt);

  function _foldr(_f, _acc, _xsIt) {
    let _itObj = _xsIt.next();

    if (_itObj.done) return _acc;
    return _f(_itObj.value, _foldr(_f, _acc, _xsIt));
  }
}

module.exports = cu(foldr);

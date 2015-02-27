var clone    = require('clone');
var cu       = require('auto-curry');
var isObject = require('./util').isObject;


// iterate :: (a -> a) -> a -> [a]
function* iterate(f, a) {
  while (true) {
    // See the comment in repeat
    if (!isObject(a)) yield a;
    else yield clone(a);
    a = f(a);
  }
}

module.exports = cu(iterate);

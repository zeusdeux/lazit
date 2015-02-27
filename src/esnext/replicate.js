var clone    = require('clone');
var cu       = require('auto-curry');
var isObject = require('./util').isObject;


// replicate :: Int -> a -> [a]
function replicate(n, a) {
  var res = [];
  // See the comment in repeat
  while (n--) {
    if (!isObject(a)) res.push(a);
    else res.push(clone(a));
  }
  return res;
}

module.exports = cu(replicate);

let clone    = require('clone');
let cu       = require('auto-curry');
let isObject = require('./util').isObject;


// replicate :: Int -> a -> [a]
function replicate(n, a) {
  let res = [];

  // See the comment in repeat
  while (n--) {
    if (!isObject(a)) res.push(a);
    else res.push(clone(a));
  }
  return res;
}

module.exports = cu(replicate);

var clone    = require('clone');
var isObject = require('./util').isObject;


// cycle :: [a] -> [a]
function* cycle(a) {
  while (true) {
    // See the comment in repeat
    for (let x of a) {
      if (!isObject(x)) yield x;
      else yield clone(x);
    }
  }
}

module.exports = cycle;

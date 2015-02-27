var cu = require('auto-curry');


// takeWhile :: (a -> Bool) -> [a] -> [a]
function* takeWhile(p, a) {
  for (let x of a) {
    if (p(x)) {
      yield x;
    }
    else {
      break;
    }
  }
}


module.exports = cu(takeWhile);

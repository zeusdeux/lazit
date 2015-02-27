var cu = require('auto-curry');


// dropWhile :: (a -> Bool) -> [a] -> [a]
function* dropWhile(p, a) {
  var doneDropping = false;
  for (let x of a) {
    if (p(x) && !doneDropping) continue;
    else {
      doneDropping = true;
      yield x;
    }
  }
}


module.exports = cu(dropWhile);

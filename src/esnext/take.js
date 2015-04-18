let cu = require('auto-curry');


// take :: Int -> [a] -> [a]
function* take(n, a) {
  for (let x of a) {
    if (n > 1) {
      yield x;
      n--;
    }
    // this condition makes sure that we yield only
    // exactly n times and not n + 1 times which
    // would happen if we were using the old if (n--) code
    else if (n === 1) {
      yield x;
      break;
    }
    else break;
  }
}

module.exports = cu(take);

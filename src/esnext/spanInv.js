var cu = require('auto-curry');


// break :: (a -> Bool) -> [a] -> ([a], [a])
// calling it spanInv which stands for spanInverse
// since break is a reserved word
function spanInv(p, a) {
  var l = [], r = [];
  var doneTaking = false;
  for (let x of a) {
    if (!p(x) && !doneTaking) l.push(x);
    else {
      doneTaking = true;
      r.push(x);
    }
  }
  return [l, r];
}


module.exports = cu(spanInv);

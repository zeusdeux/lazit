let cu = require('auto-curry');


// span :: (a -> Bool) -> [a] -> ([a], [a])
function span(p, a) {
  let l          = [];
  let r          = [];
  let doneTaking = false;

  for (let x of a) {
    if (p(x) && !doneTaking) l.push(x);
    else {
      doneTaking = true;
      r.push(x);
    }
  }
  return [l, r];
}


module.exports = cu(span);

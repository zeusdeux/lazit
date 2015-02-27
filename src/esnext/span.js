var cu = require('auto-curry');


// span :: (a -> Bool) -> [a] -> ([a], [a])
function span(p, a) {
  var l = [], r = [];
  var doneTaking = false;
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

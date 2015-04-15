// unzip3 :: [(a, b, c)] -> ([a], [b], [c])
function unzip3(a) {
  var res = [
    [],
    [],
    []
  ];
  for (let x of a) {
    for (let y of x) {
      if (3 !== x.length) throw new SyntaxError('unzip3 expects a tuple to have exactly three elements');
      let curr = res.shift();
      curr.push(y);
      res.push(curr);
    }
  }
  return res;
}


module.exports = unzip3;

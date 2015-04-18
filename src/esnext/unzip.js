// unzip :: [(a, b)] -> ([a], [b])
function unzip(a) {
  let res = [
    [],
    []
  ];
  for (let x of a) {
    for (let y of x) {
      if (2 !== x.length) throw new SyntaxError('unzip expects a tuple to have exactly two elements');
      let curr = res.shift();

      curr.push(y);
      res.push(curr);
    }
  }
  return res;
}

module.exports = unzip;

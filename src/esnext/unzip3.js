// unzip3 :: [(a, b, c)] -> ([a], [b], [c])
function unzip3(a) {
  var res = [
    [],
    [],
    []
  ];
  for (let x of a) {
    for (let y of x) {
      let curr = res.shift();
      curr.push(y);
      res.push(curr);
    }
  }
  return res;
}


module.exports = unzip3;

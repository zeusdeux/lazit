// unzip :: [(a, b)] -> ([a], [b])
function unzip(a) {
  var res = [
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

module.exports = unzip;

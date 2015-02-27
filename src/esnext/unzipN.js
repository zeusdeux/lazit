var replicate = require('./replicate');

// unzipN :: [(a, b, .... , n)] -> ([a], [b], ...., [n])
function unzipN(a) {
  var res = [...replicate(a.length, [])];
  for (let x of a) {
    for (let y of x) {
      let curr = res.shift();
      curr.push(y);
      res.push(curr);
    }
  }
  return res;
}


module.exports = unzipN;

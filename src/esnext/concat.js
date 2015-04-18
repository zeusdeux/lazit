let cu = require('auto-curry');


// concat :: [a] -> [a] -> [a]
// Append two lists
// If the first list is not finite, the result is the first list.
function* concat(a, b) {
  for (let x of a) yield x;
  for (let x of b) yield x;
}

module.exports = cu(concat);

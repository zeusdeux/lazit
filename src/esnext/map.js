let cu = require('auto-curry');


// map :: (a -> b) -> [a] -> [b]
function* map(f, a) {
  for (let x of a) yield f(x);
}

module.exports = cu(map);

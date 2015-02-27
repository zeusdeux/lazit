var cu = require('auto-curry');


// filter :: (a -> Bool) -> [a] -> [a]
function* filter(p, a) {
  for (let x of a)
    if (p(x)) yield x;
}

module.exports = cu(filter);

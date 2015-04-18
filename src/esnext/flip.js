// flip :: (a -> b -> c) -> b -> a -> c
function flip(f) {
  return function(...args) {
    return f.call(null, args[1], args[0]);
  };
}

module.exports = flip;

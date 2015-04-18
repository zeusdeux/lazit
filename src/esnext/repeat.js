let clone    = require('clone');
let isObject = require('./util').isObject;


// repeat :: a -> [a]
function* repeat(a) {
  // cloning since objects are basically pointers in js.
  // If I just `yield a` then all the elements in the resulting
  // list will contain reference to the same object and all hell
  // will break loose, it'll rain cows and horses, ketchup will
  // replace water and all the liquour in the world will disappear.
  // Saving your life here, man.
  while (true) {
    if (!isObject(a)) yield a;
    else yield clone(a);
  }
}

module.exports = repeat;

var getIteratorAndObj = require('./util').getIteratorAndObj;


// init :: [a] -> [a]
// [a] should be non-empty
function* init(a) {
  if (a[Symbol.iterator]().next().done) throw new Error('Cannot get init of empty list');
  var {xsIt, itObj} = getIteratorAndObj(a);
  xsIt.next(); //drop first element
  while (!itObj.done) yield xsIt.next().value;
}

module.exports = init;

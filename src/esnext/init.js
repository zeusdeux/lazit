var getIteratorAndObj = require('./util').getIteratorAndObj;


// init :: [a] -> [a]
// [a] should be non-empty
function* init(a) {
  var {xsIt, itObj} = getIteratorAndObj(a);
  var nextObj = xsIt.next();

  if (itObj.done) throw new Error('Cannot get init of empty list');
  while (!nextObj.done) {
    yield itObj.value;
    itObj = nextObj;
    nextObj = xsIt.next();
  }
}

module.exports = init;

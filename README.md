# lazit

[![Build Status](https://travis-ci.org/zeusdeux/lazit.svg)](https://travis-ci.org/zeusdeux/lazit)

Lazy, composable operations on iterators/generators for ES6 and beyond.

> Use lazit right now with transpilers like [babeljs](http://babeljs.io) or the [Google Traceur Compiler](https://github.com/google/traceur-compiler)
> or by using `build/lazit.js` or `build/lazit.min.js` which are precompiled using babeljs and browserified.

Lazit lets you do stuff like:

```javascript
var lazit   = require('lazit');
var take    = lazit.take;
var zip     = lazit.zip;
var iterate = lazit.iterate;
var map     = lazit.map;
var result;

// use infinite lists without any worries since everything is lazy
// here `iterate` is an infinite list builder function
result  = [...take(4, zip(iterate(x => x+1, 0), map(v => v*v, [1,2,3,4,5,6,7,8])))];
console.log(result); // [[0,1],[1,4],[2,9],[3,16]]

// or stuff like

var f = (a,b) => { b = b.slice(); b.unshift(a); return b; };
var g = (a,b) => { a = a.slice(); a.unshift(b); return a; };

console.log([...scanl(g, [], [1,2,3,4])]); // [[],[1],[2,1],[3,2,1],[4,3,2,1]]
console.log([...scanr(f, [], take(4, iterate(v => ++v, 1)))]); // [[1,2,3,4],[2,3,4],[3,4],[4],[]]
```

Lazit exposes the same api whether you're dealing with infinite lists or finite lists. Also, the functions in lazit compose pretty much like they do in haskell, etc.

Also, all functions that require more than one argument auto-curry in lazit. So you can do stuff like:

```javascript
var lazit        = require('lazit');
var mapIncFn     = lazit.map(v => ++v); // pass only one out of the 2 args required by map

console.log([...mapIncFn([1,2,3])]); // [2,3,4]
```

Current status: WIP

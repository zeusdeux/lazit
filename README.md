# lazit
Lazy composable operations on iterators/generators.

Lets you do stuff like:

```javascript
let result = [...take(4, zip(iterate(x => x+1, 0), map(v => v*v, [1,2,3,4,5,6,7,8])))];
console.log(result); // [[0,1],[1,4],[2,9],[3,16]]
```

Current status: WIP

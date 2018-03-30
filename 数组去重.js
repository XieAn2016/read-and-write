// 去除数组的重复成员
[...new Set(array)]



function dedupe(array) {
    return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]



//使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
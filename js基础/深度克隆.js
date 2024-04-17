// 加缓存，解决循环引用问题
const cache = new WeakMap();

function deepClone(value) {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  // 是否存在缓存
  if (cache.has(value)) {
    return cache.get(value);
  }

  // value 是对象
  const obj = Array.isArray(value) ? [] : {};
  // 设置原型
  Object.setPrototypeOf(obj, Object.getPrototypeOf(value));

  cache.set(value, obj);

  for (let key in value) {
    // 判断属性是否自身属性，排除原型上的属性
    if (value.hasOwnProperty(key)) {
      obj[key] = deepClone(value[key]);
    }
  }

  return obj;
}

const obj = {
  a: 1,
  b: "test",
  c: [],
  d: [1, 2],
  e: function (params) {
    return 1;
  },
  f: new Map(),
};

console.log("test1 deepClone: ", obj, deepClone(obj));

class Test {
  constructor() {
    this.a = 1;
    this.b = "test";
  }
  c() {
    console.log("c");
  }
}
Test.prototype.d = "TestPrototypeD";
const test2 = new Test();
test2.in = test2;
console.log("test2 deepClone: ", test2, deepClone(test2));

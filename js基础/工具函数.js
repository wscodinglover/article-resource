// 防抖函数
const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// 节流函数
const throttle = (fn, delay = 500) => {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};

/**
 * deep clone
 * @param {[type]} parent object 需要进⾏克隆的对象
 * @return {[type]} 深克隆后的对象
 * 局限性:
1. ⼀些特殊情况没有处理: 例如Buffer对象、Promise、Set、Map
2. 另外对于确保没有循环引⽤的对象，我们可以省去对循环引⽤的特殊处理，因为这很消耗时间
 */
const clone = (parent) => {
  // 判断类型
  const isType = (obj, type) => {
    if (typeof obj !== "object") return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
      case "Array":
        flag = typeString === "[object Array]";
        break;
      case "Date":
        flag = typeString === "[object Date]";
        break;
      case "RegExp":
        flag = typeString === "[object RegExp]";
        break;
      default:
        flag = false;
    }
    return flag;
  };
  // 处理正则
  const getRegExp = (re) => {
    var flags = "";
    if (re.global) flags += "g";
    if (re.ignoreCase) flags += "i";
    if (re.multiline) flags += "m";
    return flags;
  };
  // 维护两个储存循环引⽤的数组
  const parents = [];
  const children = [];
  const _clone = (parent) => {
    if (parent === null) return null;
    if (typeof parent !== "object") return parent;
    let child, proto;
    if (isType(parent, "Array")) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, "RegExp")) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, "Date")) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利⽤Object.create切断原型链
      child = Object.create(proto);
    }
    // 处理循环引⽤
    const index = parents.indexOf(parent);
    if (index != -1) {
      // 如果⽗数组存在本对象,说明之前已经被引⽤过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);
    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }
    return child;
  };
  return _clone(parent);
};

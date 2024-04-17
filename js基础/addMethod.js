// jquery 中的做法
function addMethod(obj, name, fn) {
  const old = obj[name];
  obj[name] = function (...args) {
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else if (typeof old === "function") {
      return old.apply(this, args);
    }
  };
}

// 重写
function createOverload() {
  const fnMap = new Map();
  function overload(...args) {
    const key = args.map((v) => typeof v).join(",");
    const fn = fnMap.get(key);
    if (!fn) {
      throw new EvalError("没有找到对应的执行函数，请在addImpl添加该实现");
    }
    return fn.apply(this, args);
  }
  overload.addImpl = function (...args) {
    const fn = args.pop();
    if (typeof fn !== "function") {
      throw new TypeError("addImpl 最后一个参数必须是个函数");
    }
    const key = args.join(",");
    fnMap.set(key, fn);
  };
  return overload;
}

module.exports = {
  addMethod,
  createOverload,
};
// export default addMethod;

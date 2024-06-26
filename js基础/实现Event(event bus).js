// 简单版：
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设⽴监听上限
  }
}
// 触发名为type的事件
EventEmeitter.prototype.emit = function (type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};
// 监听名为type的事件
EventEmeitter.prototype.addListener = function (type, fn) {
  // 将type事件以及对应的fn函数放⼊this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};

// ⾯试版：
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设⽴监听上限
  }
}
// 触发名为type的事件
EventEmeitter.prototype.emit = function (type, ...args) {
  let handler;
  handler = this._events.get(type);
  if (Array.isArray(handler)) {
    // 如果是⼀个数组说明有多个监听者,需要依次此触发⾥⾯的函数
    for (let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else {
    // 单个函数的情况我们直接触发即可
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }
  return true;
};
// 监听名为type的事件
EventEmeitter.prototype.addListener = function (type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === "function") {
    // 如果handler是函数说明只有⼀个监听者
    this._events.set(type, [handler, fn]); // 多个监听者我们需要⽤数组储存
  } else {
    handler.push(fn); // 已经有多个监听者,那么直接往数组⾥push函数即可
  }
};
EventEmeitter.prototype.removeListener = function (type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单
  // 如果是函数,说明只被监听了⼀次
  if (handler && typeof handler === "function") {
    this._events.delete(type, fn);
  } else {
    let postion;
    // 如果handler是数组,说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        postion = i;
      } else {
        postion = -1;
      }
    }
    // 如果找到匹配的函数,从数组中清除
    if (postion !== -1) {
      // 找到数组对应的位置,直接清除此回调
      handler.splice(postion, 1);
      // 如果清除后只有⼀个函数,那么取消数组,以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      }
    } else {
      return this;
    }
  }
};

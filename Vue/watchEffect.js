let activeEffect = null;
function watchEffect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

const effects = [];

const obj = {
  _value: 1,
  get value() {
    if (activeEffect) {
      // get 时，如果有effect 在执行，进行依赖收集
      effects.push(activeEffect);
    }
    return this._value;
  },
  set value(val) {
    this._value = val;
    console.log("收集了%s个依赖", effects.length);
    effects.forEach((effect) => effect());
  },
};

let clicked = false;

watchEffect(() => {
  obj.value;
  if (clicked) {
    console.log("触发effect ===> ", obj.value);
  }
});

setTimeout(() => {
  clicked = true;
  obj.value = 2;
}, 2000);

let activeEffect = null;

function microTask(fn) {
  return Promise.resolve().then(fn);
}

function effect(fn) {
  activeEffect = fn;
  // microTask(fn);
  fn();
  activeEffect = null;
}

class RefImpl {
  _value;
  effects = new Set();
  timer = 0;

  constructor(value) {
    this._value = value;
  }

  get value() {
    if (activeEffect) {
      this.effects.add(activeEffect);
    }

    console.log("timer: %d", Date.now());

    return this._value;
  }

  set value(value) {
    this._value = value;

    // microTask(() => this.effects.forEach((fn) => fn()));
    this.effects.forEach((fn) => fn());
  }
}

function ref(value) {
  return new RefImpl(value);
}

//  example test
const count = ref(0);

effect(() => {
  console.log("watching count: ", count.value);
});

count.value++;
count.value++;
count.value++;
count.value = count.value + 1;

const timer = setInterval(() => {
  count.value = count.value + 1;
  console.log("-----");

  if (count.value > 5) {
    clearInterval(timer);
  }
}, 0);

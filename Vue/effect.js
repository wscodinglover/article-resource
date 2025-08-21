let activeSub;

function effect(fn) {
  activeSub = fn;
  fn();
  activeSub = null;
}

const count = {
  _value: 0,
  fn: () => {},
  get value() {
    if (activeSub) {
      this.fn = activeSub;
    }
    return this._value;
  },

  set value(value) {
    this._value = value;

    this.fn();
  },
};

effect(() => {
  console.log("count.value 看到变化了", count.value);
});

const timer = setInterval(() => {
  count.value = count.value + 1;
  console.log("-----");

  if (count.value > 5) {
    clearInterval(timer);
  }
}, 500);

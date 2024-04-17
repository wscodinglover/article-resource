Array.prototype.myForEach = function (callback) {
  const len = this.length;
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  let k = 0;
  while (k < len) {
    const pk = String(k);
    if (pk in this) {
      const kValue = this[pk];
      callback.call(this, kValue, k, this);
    }
    k++;
  }
};

// test...
const arr = [1, 2, 3, 4, 5, 6, 7];
arr.myForEach((item, i, r) => {
  arr.splice(i, 1);
  // arr.push(2);
  console.log("arr", item, i, r);
});

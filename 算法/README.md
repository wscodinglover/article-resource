### 如何分析时间复杂度?

当问题规模即要处理的数据增⻓时，基本操作要重复执⾏的次数必定也会增⻓，那么我们关⼼地是这个执⾏次数以什么
样的数量级增⻓。
我们⽤⼤ O 表示法表示⼀下常⻅的时间复杂度量级：
常数阶 O(1) 线性阶 O(n) 对数阶 O(logn) 线性对数阶 O(nlogn) 平⽅阶 O(n²)
当然还有指数阶和阶乘阶这种⾮常极端的复杂度量级，我们就不讨论了。

#### O(1)

传说中的常数阶的复杂度，这种复杂度⽆论数据规模 n 如何增⻓，计算时间是不变的。
举⼀个简单的例⼦：

```js
const increment = (n) => n++;
```

不管 n 如何增⻓，都不会影响到这个函数的计算时间，因此这个代码的时间复杂度都是 O(1)。

#### O(n)

线性复杂度，随着数据规模 n 的增⻓，计算时间也会随着 n 线性增⻓。
典型的 O(n)的例⼦就是线性查找。

```js
const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
};
```

线性查找的时间消化与输⼊的数组数量 n 成⼀个线性⽐例，随着 n 规模的增⼤，时间也会线性增⻓。

#### O(logn)

对数复杂度，随着问题规模 n 的增⻓，计算时间也会随着 n 对数级增⻓。
典型的例⼦是⼆分查找法。

```js
function binarySearch(arr, target) {
  let max = arr.length - 1;
  let min = 0;
  while (min <= max) {
    let mid = Math.floor((max + min) / 2);
    if (target < arr[mid]) {
      max = mid - 1;
    } else if (target > arr[mid]) {
      min = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}
```

在⼆分查找法的代码中，通过 while 循环，成 2 倍数的缩减搜索范围，也就是说需要经过 log2^n 次即可跳出循环。
事实上在实际项⽬中， O(logn) 是⼀个⾮常好的时间复杂度，⽐如当 n=100 的数据规模时，⼆分查找只需要 7 次，线性
查找需要 100 次，这对于计算机⽽⾔差距不⼤，但是当有 10 亿的数据规模的时候，⼆分查找依然只需要 30 次，⽽线性查
找需要惊⼈的 10 亿次， O(logn) 时间复杂度的算法随着数据规模的增⼤，它的优势就越明显。

#### O(nlogn)

线性对数复杂度，随着数据规模 n 的增⻓，计算时间也会随着 n 呈线性对数级增⻓。
这其中典型代表就是归并排序，我们会在对应⼩节详细分析它的复杂度。

```js
const mergeSort = (array) => {
  const len = array.length;
  if (len < 2) {
    return len;
  }
  const mid = Math.floor(len / 2);
  const first = array.slice(0, mid);
  const last = array.slice(mid);
  return merge(mergeSort(fist), mergeSort(last));
  function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
  }
};
```

#### O(n²)

平⽅级复杂度，典型情况是当存在双重循环的时候，即把 O(n) 的代码再嵌套循环⼀遍，它的时间复杂度就是 O(n²)
了，代表应⽤是冒泡排序算法。

```js
function bubleSort(arra) {
  var temp;
  for (var i = 0; i < arra.length; i++) {
    for (var j = 0; j < arra.length - i - 1; j++) {
      if (arra[j] > arra[j + 1]) {
        temp = arra[j];
        arra[j] = arra[j + 1];
        arra[j + 1] = temp;
      }
    }
  }
  return arra;
}
```

/**
 * 归并排序是建⽴在归并操作上的⼀种有效的排序算法。该算法是采⽤分治法（Divide and Conquer）的⼀个⾮常
典型的应⽤。归并排序是⼀种稳定的排序⽅法。将已有序的⼦序列合并，得到完全有序的序列；即先使每个⼦序
列有序，再使⼦序列段间有序。若将两个有序表合并成⼀个有序表，称为2-路归并。
具体算法描述如下：
  1. 把⻓度为n的输⼊序列分成两个⻓度为n/2的⼦序列；
  2. 对这两个⼦序列分别采⽤归并排序；
  3. 将两个排序好的⼦序列合并成⼀个最终的排序序列。
 */

function mergeSort(arr) {
  //采⽤⾃上⽽下的递归⽅法
  var len = arr.length;
  if (len < 2) {
    return arr;
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  var result = [];
  console.time("归并排序耗时");
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());
  console.timeEnd("归并排序耗时");
  return result;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(arr));

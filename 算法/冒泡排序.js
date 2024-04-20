/**
 * 冒泡排序（Bubble Sort）
    实现思路:
    1. ⽐较相邻的元素。如果第⼀个⽐第⼆个⼤，就交换他们两个。
    2. 对每⼀对相邻元素作同样的⼯作，从开始第⼀对到结尾的最后⼀对。这步做完后，最后的元素会是最⼤的数。
    3. 针对所有的元素重复以上的步骤，除了最后⼀个。
    4. 持续每次对越来越少的元素重复上⾯的步骤，直到没有任何⼀对数字需要⽐较。
 */
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

// 改进1: 设置⼀标志性变量pos,⽤于记录每趟排序中最后⼀次进⾏交换的位置。由于pos位置之后的记录均已交换到位,故
// 在进⾏下⼀趟排序时只要扫描到pos位置即可。
function bubbleSort2(arr) {
  console.time("改进后冒泡排序耗时");
  var i = arr.length - 1; //初始时,最后位置保持不变
  while (i > 0) {
    var pos = 0; //每趟开始时,⽆记录交换
    for (var j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        pos = j; //记录交换的位置
        var tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    i = pos; //为下⼀趟排序作准备
  }
  console.timeEnd("改进后冒泡排序耗时");
  return arr;
}

// 改进2: 传统冒泡排序中每⼀趟排序操作只能找到⼀个最⼤值或最⼩值,我们考虑利⽤在每趟排序中进⾏正向和反向两遍
// 冒泡的⽅法⼀次可以得到两个最终值(最⼤者和最⼩者) , 从⽽使排序趟数⼏乎减少了⼀半。
function bubbleSort3(arr3) {
  var low = 0;
  var high = arr.length - 1; //设置变量的初始值
  var tmp, j;
  console.time("2.改进后冒泡排序耗时");
  while (low < high) {
    for (
      j = low;
      j < high;
      ++j //正向冒泡,找到最⼤者
    )
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    --high; //修改high值, 前移⼀位
    for (
      j = high;
      j > low;
      --j //反向冒泡,找到最⼩者
    )
      if (arr[j] < arr[j - 1]) {
        tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
      }
    ++low; //修改low值,后移⼀位
  }
  console.timeEnd("2.改进后冒泡排序耗时");
  return arr3;
}

/**
 * 希尔排序的核⼼在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。动态定义间隔
  序列的算法是《算法（第4版》的合著者Robert Sedgewick提出的。
  先将整个待排序的记录序列分割成为若⼲⼦序列分别进⾏直接插⼊排序，具体算法描述：
    1. 选择⼀个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
    2. 按增量序列个数k，对序列进⾏k 趟排序；
    3. 每趟排序，根据对应的增量ti，将待排序列分割成若⼲⻓度为m 的⼦序列，分别对各⼦表进⾏直接插⼊排序。仅增
    量因⼦为1 时，整个序列作为⼀个表来处理，表⻓度即为整个序列的⻓度。
 */
function shellSort(arr) {
  var len = arr.length,
    temp,
    gap = 1;
  console.time("希尔排序耗时:");
  while (gap < len / 5) {
    //动态定义间隔序列
    gap = gap * 5 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  console.timeEnd("希尔排序耗时:");
  return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(shellSort(arr)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

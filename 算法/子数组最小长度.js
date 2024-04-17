/**
 * 有一个正整数数组 nums 和一个正整数 target,
 * 在 nums 中找到一个子数组其元素和 ≥ target
 * 返回子数组的最小长度, 如果没有这样的数组 则返回 0
 * @example
 * input: target = 7, nums = [2,3,1,2,4,3]
 * output: 2
 */
function minSubArrayLen(target, nums) {
  // 滑动窗口
  let min = Infinity;
  let l = 0;
  let sum = 0;

  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      min = Math.min(min, r - l + 1);
      sum -= nums[l];
      l++;
    }
  }

  return min === Infinity ? 0 : min;
}

// let target = 7,
//   nums = [2, 3, 1, 2, 4, 3];
// const result = minSubArrayLen(target, nums);
// console.log("result", result);

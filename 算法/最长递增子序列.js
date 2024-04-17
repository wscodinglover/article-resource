let rob = function (nums) {
  if (!Array.isArray(nums)) return nums;
  if (nums.length <= 2) {
    return [0, nums[0], Math.max(...nums)][nums.length];
  }
  const dp = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }
  console.log("dp", dp);

  return dp[dp.length - 1];
};

const results = [
  rob(),
  rob([]),
  rob([1]),
  rob([2]),
  rob([1, 3]),
  rob([4, 3]),
  rob([4, 3, 1, 2, 3, 4, 5, 6]),
];

console.log("result: ", results);

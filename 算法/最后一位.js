function calc(str) {
  var coeff = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  var suffix = ["1", "0", "x", "9", "8", "7", "6", "5", "4", "3", "2"];
  var sum = 0;
  for (var i = 0; i < 17; i++)
    sum += coeff[i] * parseInt(str.charCodeAt(i) - 48);
  sum %= 11;
  str = str.substr(0, 17) + suffix[sum];
  return str;
}
console.log(calc("340823****213*"));
console.log(calc("360402****004*"));

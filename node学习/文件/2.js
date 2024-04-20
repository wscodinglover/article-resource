const fs = require("fs");

fs.readFile("./b.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // data 是二进制类型，需要转换成字符串
  const txtStr = data.toString();

  const flagArr = [
    "彖曰：",
    "初六：",
    "六二：",
    "六三：",
    "六四：",
    "六五：",
    "上六：",
    "用六：",
    "象曰：",
    "初九：",
    "九二：",
    "九三：",
    "九四：",
    "九五：",
    "上九：",
    "用九：",
    "文言曰：",
  ];
  const txtArr = [];
  txtStr
    .split("\n")
    .filter((v) => v)
    .forEach((v, i) => {
      if (i === 0) {
        return txtArr.push(`"#icon${v}",`);
      }
      const flag = flagArr.some((w) => v.trim().startsWith(w));
      if (flag) {
        return txtArr.push(`"",\n"#color[danger]${v}",`);
      }
      if (v.trim().startsWith("【总论乾坤】")) {
        return txtArr.push(`"",\n"#divider总论",\n"",`);
      }
      txtArr.push(`"${v}",`);
    });

  fs.writeFile("./b.txt", txtArr.join("\n"), { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

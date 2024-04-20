const fs = require("fs");

fs.readFile("./c.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // data 是二进制类型，需要转换成字符串
  const txtStr = data.toString().replaceAll(/\［\d+\］/g, "");

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
  ];

  const flagArr1 = ["【占】　", "○　"];
  const txtArr = [];
  txtStr
    .split("\n")
    .filter((v) => v)
    .forEach((v) => {
      const flag = flagArr.some((w) => v.trim().startsWith(w));
      if (flag) {
        return txtArr.push(`"",\n"#color[big]${v}",`);
      }

      const flag1 = flagArr1.some((w) => v.trim().startsWith(w));
      if (flag1) {
        return txtArr.push(`"#color[success]${v}",`);
      }
      if (v.trim().startsWith("▲　")) return;

      if (v.trim().startsWith("【例】　")) {
        return txtArr.push(`"#color[big]${v}",`);
      }

      if (v.trim().startsWith("《象传》曰：")) {
        return txtArr.push(`"#color[bold]${v}",`);
      }
      txtArr.push(`"${v}",`);
    });

  fs.writeFile("./c.txt", txtArr.join("\n"), { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

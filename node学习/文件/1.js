const fs = require("fs");

fs.readFile("./a.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // data 是二进制类型，需要转换成字符串
  const txtStr = data.toString();
  const txtArr = [];
  txtStr
    .split("\n")
    .filter((v) => v)
    .forEach((v) => {
      txtArr.push(`"${v}",`);
    });

  fs.writeFile("./a.txt", txtArr.join("\n"), { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

const fs = require("fs");
async function init() {
  const files = await fs.readdirSync("./svg");
  for (let i = 0; i < files.length; i++) {
    const v = files[i];

    await fs.readFile(`./svg/${v}`, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // data 是二进制类型，需要转换成字符串
      const txtStr = data.toString();
      console.log("---", i, v.slice(0, -4), txtStr, "\n\n");
      fs.writeFile(
        `./tt.txt`,
        `\n\n '${v.slice(
          0,
          -4
        )}':(props) => <svg width={props.width} height={props.width} color={props.color} ${txtStr.slice(
          4
        )}, \n\n`,
        { flag: "a" },
        (err) => {}
      );
    });
  }
}

init();

const pako = require("pako");
const fs = require("fs");
const https = require("https");
const { yijingData } = require("./a");

const test = { my: "super", puper: [456, 567], awesome: "pako" };

const str = pako.deflate(JSON.stringify(test));
console.log("encoded", str);
// const a = { name: new TextDecoder().decode(str) };
// const b = new TextEncoder().encode(a.name);
// console.log("decoded", b);

// const compressed = JSON.parse(pako.inflate(str, { to: "string" }));
// console.log("compressed", compressed);

// var oReq = new XMLHttpRequest();
// oReq.open("GET", "/myfile.png", true);
// oReq.responseType = "arraybuffer";

// oReq.onload = function (oEvent) {
//   var arrayBuffer = oReq.response; // Note: not oReq.responseText
//   if (arrayBuffer) {
//     var byteArray = new Uint8Array(arrayBuffer);
//     for (var i = 0; i < byteArray.byteLength; i++) {
//       // do something with each byte in the array
//     }
//   }
// };

// oReq.send(null);

async function t() {
  const compressed = await pako.deflate(JSON.stringify(yijingData));
  fs.writeFile("./a-a.bin", compressed, { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
// t();

// const compressed = pako.deflate(JSON.stringify(yijingData));

fs.readFile("./a-a.bin", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("----", data.length);
  // const st = pako.inflate(data, { to: "string" });
  // const restored = JSON.parse(st);
  // fs.writeFile("./a-a.js", st, { flag: "w" }, (err) => {
  //   if (err) {
  //     console.error(err);
  //   }
  // });

  // console.log("txtStr", restored);
});

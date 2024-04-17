// import addMethod from "./addMethod";
const { addMethod, createOverload } = require("./addMethod");

// -------jquery------------
const searcher = {};

addMethod(searcher, "getUsers", () => {
  console.log("查询所有用户");
});

addMethod(searcher, "getUsers", (name) => {
  console.log("按照姓名查询用户");
});

addMethod(searcher, "getUsers", (firstname, sex) => {
  console.log("按照姓名和性别查询用户");
});

// searcher.getUsers("a", "b");
// searcher.getUsers();
// searcher.getUsers("a", "b");
// searcher.getUsers("a");

//  --------重写--------
const getUsers = createOverload();

getUsers.addImpl(() => {
  console.log("查询所有用户");
});

const searchPages = (page, size = 10) => {
  console.log("根据页码和数量查询用户");
};
getUsers.addImpl("number", searchPages);
getUsers.addImpl("number", "number", searchPages);

getUsers.addImpl("string", (name) => {
  console.log("根据姓名来查询");
});

getUsers.addImpl("string", "string", (name, sex) => {
  console.log("根据姓名和性别来查询");
});
getUsers(1);
getUsers("1", "2");
getUsers("1");
getUsers();
getUsers(1, 2);

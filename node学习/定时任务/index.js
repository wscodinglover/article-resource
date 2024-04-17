import schedule from "node-schedule";

// 定时任务，每5秒执行一次
schedule.scheduleJob("*/5 * * * * *", function () {
  console.log("定时任务: 每5秒执行一次");
});

// schedule 格式说明 https://www.npmjs.com/package/node-schedule
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

const schedule = require("node-schedule");

function testJob() {
  schedule.scheduleJob("10 * * * * *", () => {
    console.log("There is a job running!");
  });
}

module.exports = {
  testJob: testJob
};

const cron = require("node-cron");

const startDailyReport = () => {

  cron.schedule("0 0 * * *", () => {

    console.log(
      "Daily Report Generated:",
      new Date()
    );

  });

};

module.exports = startDailyReport;
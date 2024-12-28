// scheduledTasks.js
const cron = require("node-cron")
const { FundRequests } = require("../models/fund_req-model")

// Schedule a task to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date()

    // Update pending fund requests with expired dates to "disabled"
    await FundRequests.updateMany({ valid_until: { $lt: currentDate }, status: "pending" }, { status: "disabled" })

    // Update approved fund requests with expired dates to "completed"
    await FundRequests.updateMany({ valid_until: { $lt: currentDate }, status: "approved" }, { status: "completed" })

    //update rejected fund requests with expired dates to "disabled"
    await FundRequests.updateMany({ valid_until: { $lt: currentDate }, status: "rejected" }, { status: "disabled" })

    console.log("Fund requests updated successfully")
  } catch (error) {
    console.error("Error updating fund requests:", error)
  }
})

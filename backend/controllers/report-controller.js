const { FundRequests } = require("../models/fund_req-model")
const { Donations } = require("../models/donation-model")

const getUserReport = async (req, res) => {
  const userId = req.userId // Assuming you have user authentication and user ID available

  try {
    const latestRequest = await FundRequests.findOne({ user: userId }).sort({ createdAt: -1 })
    const totalContributions = await Donations.aggregate([{ $match: { "donor._id": userId } }, { $group: { _id: null, total: { $sum: "$amount" } } }])
    //fund raised history
    const fundHistory = await FundRequests.aggregate([{ $match: { user: userId } }, { $group: { _id: { month: { $month: "$createdAt" } }, total: { $sum: "$raised_amount" } } }])
    //completed requests
    const completedRequests = await FundRequests.countDocuments({ user: userId, status: "completed" })
    //pending requests
    const pendingRequests = await FundRequests.countDocuments({ user: userId, status: "pending" })
    //total fund raised
    const totalFundRaised = await FundRequests.aggregate([{ $match: { user: userId } }, { $group: { _id: null, total: { $sum: "$raised_amount" } } }])

    res.json({
      latestRequest,
      totalContributions: totalContributions[0]?.total || 0,
      fundHistory: fundHistory.map((data) => data.total),
      completedRequests,
      pendingRequests,
      totalFundRaised: totalFundRaised[0]?.total || 0,
    })
  } catch (err) {
    console.error("Error fetching user dashboard data", err)
    res.status(500).json({ message: "Internal server error" })
  }
}

const getAdminReport = async (req, res) => {
  try {
    const totalRaised = await Donations.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])
    const totalRequests = await FundRequests.countDocuments()
    const pendingRequests = await FundRequests.countDocuments({ status: "pending" })
    const completedRequests = await FundRequests.countDocuments({ status: "completed" })
    const totalFundAmount = await FundRequests.aggregate([{ $group: { _id: null, total: { $sum: "$raised_amount" } } }])
    // uniqueDonors with donation status is success
    const uniqueDonors = await Donations.aggregate([{ $match: { status: "success" } }, { $group: { _id: "$donor._id" } }, { $count: "total" }])

    // Fund history for bar chart
    const fundHistory = await FundRequests.aggregate([{ $group: { _id: { month: { $month: "$createdAt" } }, total: { $sum: "$raised_amount" } } }])

    // Fund growth for line chart
    const fundGrowth = await Donations.aggregate([{ $group: { _id: { week: { $week: "$createdAt" } }, total: { $sum: "$amount" } } }])

    res.json({
      totalRaised: totalRaised[0]?.total || 0,
      totalRequests,
      pendingRequests,
      completedRequests,
      totalFundAmount: totalFundAmount[0]?.total || 0,
      uniqueDonors: uniqueDonors[0]?.total || 0,
      fundHistory: fundHistory.map((data) => data.total),
      fundGrowth: fundGrowth.map((data) => data.total),
    })
  } catch (error) {
    res.status(500).send("Error generating report")
  }
}

module.exports = { getUserReport, getAdminReport }

const mongoose = require("mongoose")
const catchAsync = require("../utils/catch-async")
const AppError = require("../utils/app-error")
const { Donations } = require("../models/donation-model")
const { FundRequests } = require("../models/fund_req-model")
const config = require("../config")
const SSLCommerzPayment = require("sslcommerz-lts")

const store_id = config.STORE_ID
const store_passwd = config.STORE_PASSWORD
const is_live = false //true for live, false for sandbox

const makeDonation = catchAsync(async (req, res, next) => {
  //generate a unique transaction id using ObjectId
  const transaction_id = new mongoose.Types.ObjectId().toString()
  //sslcommerz init
  const data = {
    total_amount: req.body.amount,
    currency: "BDT",
    tran_id: transaction_id,
    success_url: `${config.BASE_URL}/donate/success/${transaction_id}`,
    fail_url: `${config.BASE_URL}/donate/fail/${transaction_id}`,
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  }

  const { fundreq_id, amount, anonymous, donor } = req.body

  try {
    if (!fundreq_id || !amount) {
      return next(new AppError("Please provide all the required fields", 400))
    }

    const donation = await Donations.create({
      donor,
      fundreq_id,
      transaction_id,
      amount,
      anonymous,
    })
  } catch (err) {
    return next(new AppError(err.message, 400))
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL
    res.send({ url: GatewayPageURL })
  })
})

const donationSuccess = catchAsync(async (req, res, next) => {
  const transaction_id = req.params.id

  // Find the donation using transaction_id
  const donation = await Donations.findOne({ transaction_id })
  if (!donation) {
    return next(new AppError("Donation not found", 404))
  }
  donation.status = "success"
  await donation.save()

  // Find the fund request using fundreq_id
  const fundReq = await FundRequests.findById(donation.fundreq_id)
  if (!fundReq) {
    return next(new AppError("Fund request not found", 404))
  }

  // Update fund request with donation amount
  if (donation.status === "success") {
    fundReq.raised_amount += donation.amount
    if (fundReq.raised_amount >= fundReq.goal_amount) {
      fundReq.status = "completed"
    }
  }
  await fundReq.save()

  const frontendUrl = `${config.FRONTEND_URL}/donate/success/${transaction_id}`
  res.redirect(frontendUrl)
})

const donationFail = catchAsync(async (req, res, next) => {
  const transaction_id = req.params.id
  const frontendUrl = `${config.FRONTEND_URL}/donate/fail/${transaction_id}`
  res.redirect(frontendUrl)
})

const getTotalDonations = catchAsync(async (req, res, next) => {
  //total donations where status is success
  const totalDonations = await Donations.aggregate([
    {
      $match: {
        status: "success",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ])

  res.status(200).json({
    status: "success",
    totalDonations: totalDonations[0].total,
  })
})

module.exports = {
  makeDonation,
  donationSuccess,
  donationFail,
  getTotalDonations,
}

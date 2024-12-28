const catchAsync = require("../utils/catch-async")
const AppError = require("../utils/app-error")
const { User } = require("../models/User")

const getAmbassadors = catchAsync(async (req, res, next) => {
  const ambassadors = await User.find({ role: "ambassador" }).select("-password")
  res.status(200).json({
    status: "success",
    data: ambassadors,
  })
})

const getAmbassador = catchAsync(async (req, res, next) => {
  const ambassador = await User.findById(req.params.id).select("-password")
  if (!ambassador) {
    return next(new AppError("No ambassador found with that ID", 404))
  }
  res.status(200).json({
    status: "success",
    data: ambassador,
  })
})

const getAmbassadorRequests = catchAsync(async (req, res, next) => {
  const ambassadorRequests = await User.find({ isAmbassadorReq: true }).select("-password")
  res.status(200).json({
    status: "success",
    message: "Ambassador request route",
    data: ambassadorRequests,
  })
})

const approveAmbassador = catchAsync(async (req, res, next) => {
  const ambassador = await User.findById(req.params.id)
  if (!ambassador) {
    return next(new AppError("No ambassador found with that ID", 404))
  }
  ambassador.isAmbassadorReq = false
  ambassador.role = "ambassador"
  await ambassador.save()
  res.status(200).json({
    status: "success",
    message: "Ambassador approved",
    data: ambassador,
  })
})

const rejectAmbassador = catchAsync(async (req, res, next) => {
  const ambassador = await User.findById(req.params.id)
  if (!ambassador) {
    return next(new AppError("No ambassador found with that ID", 404))
  }
  ambassador.isAmbassadorReq = false
  await ambassador.save()
  res.status(200).json({
    status: "success",
    message: "Ambassador rejected",
    data: ambassador,
  })
})

module.exports = {
  getAmbassadors,
  getAmbassador,
  getAmbassadorRequests,
  approveAmbassador,
  rejectAmbassador,
}

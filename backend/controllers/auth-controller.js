const authServices = require("../services/auth-service")
const tokenServices = require("../services/token-service")
const catchAsync = require("../utils/catch-async")
const AppError = require("../utils/app-error")
const { validateUser } = require("../models/User")

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400))
  }

  const user = await authServices.login(email, password)
  const token = tokenServices.generateJwtToken(user._id)

  res.status(200).json({ status: "success", token, user: { _id: user._id, name: user.name, email: user.email, role: user.role, department: user.department, campus: user.campus, phone: user.phone, avatar: user.avatar } })
})

const register = catchAsync(async (req, res, next) => {
  const { error } = validateUser(req.body)

  if (error) console.log(error.details[0].message)

  if (error) return next(new AppError(error.details[0].message, 400))

  const user = await authServices.register(req.body)
  const token = tokenServices.generateJwtToken(user._id)

  if (!user) console.log("User not created")

  res.status(201).json({ status: "success", token, user: { _id: user._id, name: user.name, email: user.email, role: user.role, department: user.department, campus: user.campus, phone: user.phone, avatar: user.avatar, isAmbassadorReq: user.isAmbassadorReq } })
})

const logout = catchAsync(async (req, res, next) => {
  const user = await authServices.logout(req.user._id)

  res.status(200).json({ status: "success", message: "User logged out successfully" })
})

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await authServices.getAllUsers()

  res.status(200).json({ status: "success", users })
})

module.exports = { login, register, logout, getAllUsers }

const { User } = require("../models/User")
const { Campuses } = require("../models/campus-model")
const { Departments } = require("../models/department-model")
const tokenService = require("./token-service")
const config = require("../config")
const userService = require("./user-service")
const catchAsync = require("../utils/catch-async")

const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password")
  const isMatch = await user?.comparePassword(password, user.password)

  if (!user || !isMatch) {
    throw new Error("Invalid email or password")
  }

  return user
}

const register = async (user) => {
  const isExist = await userService.getOneUser({ email: user.email })

  if (isExist) {
    throw new Error("User already exists")
  }
  user.avatar = `https://api.dicebear.com/8.x/bottts/png?seed=${user.email}`

  return await User.create(user)
}

const logout = async (userId) => {
  const user = await userService.getOneUser({ _id: userId })

  if (!user) {
    throw new Error("User not found")
  }

  user.lastLoggedoutAt = Date.now()
  await user.save()
}

const getAllUsers = async () => {
  try {
    // Get users with role not equal to "admin" and exclude the password field
    let users = await User.find({ role: { $ne: "admin" } }).select("-password")

    // Convert users to plain JS objects to modify them
    users = users.map((user) => user.toObject())

    // Use Promise.all to handle asynchronous operations for campus and department
    await Promise.all(
      users.map(async (user) => {
        if (user.campus) {
          const campus = await Campuses.findById(user.campus)
          user.campus = campus ? campus.name : "" // If campus exists, assign it, otherwise keep it blank
        } else {
          user.campus = "" // If no campus, explicitly set as blank
        }

        if (user.department) {
          const department = await Departments.findById(user.department)
          user.department = department ? department.name : "" // If department exists, assign it, otherwise keep it blank
        } else {
          user.department = "" // If no department, explicitly set as blank
        }
      })
    )

    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Unable to fetch users")
  }
}

module.exports = { login, register, logout, getAllUsers }

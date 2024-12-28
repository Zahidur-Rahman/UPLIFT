const userService = require("../services/user-service")
const tokenService = require("../services/token-service")
const AppError = require("../utils/app-error")
const catchAsync = require("../utils/catch-async")
const { getOneRole } = require("../services/role-service")
const { getOnePermission } = require("../services/permission-service")

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401))
  }

  // 2) Verification token
  const decoded = await tokenService.verifyJwtToken(token)

  // 3) Check if user still exists
  const currentUser = await userService.getOneUser({ _id: decoded.id })
  if (!currentUser) {
    return next(new AppError("The user belonging to this token does no longer exist.", 401))
  }

  // Log user to verify if it's correctly set
  // console.log("Current User:", currentUser)

  // 4) Check if user changed password after the token was issued
  if (currentUser.lastLoggedoutAfter(decoded.iat)) {
    return next(new AppError("User recently logged out. Please log in again.", 401))
  }

  // 5) Attach user to the request
  req.user = currentUser
  next()
})

const restrictTo = (permission) => {
  return async (req, res, next) => {
    try {
      // Check if req.user is available
      if (!req.user) {
        return next(new AppError("You are not logged in! Please log in to get access.", 401))
      }

      // Fetch the user's role
      const roleDoc = await getOneRole(req.user.role)
      if (!roleDoc) {
        return next(new AppError("Role not found", 404))
      }

      // Grant access if the user is an admin
      if (roleDoc.role === "admin") {
        return next()
      }

      // Fetch the permission document
      const permissionDoc = await getOnePermission(permission)
      if (!permissionDoc) {
        return next(new AppError("Permission not found", 404))
      }

      // Check if the role has the required permission
      if (roleDoc.permissions.includes(permissionDoc._id)) {
        return next()
      }

      // If no permission is found, return error
      return next(new AppError("You do not have permission to perform this action", 403))
    } catch (error) {
      return next(new AppError("An error occurred while checking permissions", 500))
    }
  }
}

module.exports = { protect, restrictTo }

const catchAsync = require("../utils/catch-async")
const AppError = require("../utils/app-error")
const roleService = require("../services/role-service")

const getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await roleService.getAllRoles()

  res.status(200).json({
    status: "success",
    message: "Roles retrieved successfully",
    roles,
  })
})

const getRolePermissions = catchAsync(async (req, res, next) => {
  const role = await roleService.getRolePermissions(req.params.id)

  if (!role) {
    return next(new AppError("No role found with that ID", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Role permissions retrieved successfully",
    role,
  })
})

const createRole = catchAsync(async (req, res, next) => {
  const role = await roleService.createRole(req.body)

  res.status(201).json({
    status: "success",
    message: "Role created successfully",
    role,
  })
})

const assignPermissionToRole = catchAsync(async (req, res, next) => {
  const role = await roleService.assignPermissionToRole(req.params.id, req.body)

  if (!role) {
    return next(new AppError("No role found with that ID", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Permission assigned to role successfully",
    role,
  })
})

const updateRole = catchAsync(async (req, res, next) => {
  const role = await roleService.updateRole(req.params.id, req.body)

  if (!role) {
    return next(new AppError("No role found with that ID", 404))
  }

  res.status(200).json({
    status: "success",
    message: "Role updated successfully",
    role,
  })
})

const deleteRole = catchAsync(async (req, res, next) => {
  const role = await roleService.deleteRole(req.params.id)

  if (!role) {
    return next(new AppError("No role found with that ID", 404))
  }

  res.status(204).json({
    status: "success",
    message: "Role deleted successfully",
  })
})

module.exports = {
  getAllRoles,
  getRolePermissions,
  createRole,
  updateRole,
  deleteRole,
  assignPermissionToRole,
}

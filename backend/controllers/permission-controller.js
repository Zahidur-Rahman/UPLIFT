const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const permissionService = require('../services/permission-service');

const getAllPermissions = catchAsync(async (req, res, next) => {
  const permissions = await permissionService.getAllPermissions();
  res.status(200).json({
    status: 'success',
    message: 'Permissions retrieved successfully',
    permissions,
  });
});

const createPermission = catchAsync(async (req, res, next) => {
  const permission = await permissionService.createPermission(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Permission created successfully',
    permission,
  });
});

const updatePermission = catchAsync(async (req, res, next) => {
  const permission = await permissionService.updatePermission(req.params.id, req.body);
  if (!permission) {
    return next(new AppError('No permission found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Permission updated successfully',
    permission,
  });
});

const deletePermission = catchAsync(async (req, res, next) => {
  const permission = await permissionService.deletePermission(req.params.id);
  if (!permission) {
    return next(new AppError('No permission found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'Permission deleted successfully',
    data: null,
  });
});

module.exports = {
  getAllPermissions,
  createPermission,
  updatePermission,
  deletePermission,
};

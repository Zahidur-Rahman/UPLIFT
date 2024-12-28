const { Permissions } = require('../models/permission-model');

const getAllPermissions = async () => {
  return Permissions.find();
};

const getOnePermission = async (permission) => {
  return Permissions.findOne({ permission });
};

const createPermission = async (permission) => {
  const newPermission = new Permissions(permission);

  return newPermission.save();
};

const updatePermission = async (id, permission) => {
  return Permissions.findByIdAndUpdate(id, permission, {
    new: true,
  });
};

const deletePermission = async (id) => {
  return Permissions.findByIdAndDelete(id);
};

module.exports = {
  getAllPermissions,
  getOnePermission,
  createPermission,
  updatePermission,
  deletePermission,
};

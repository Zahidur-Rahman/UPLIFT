const { Roles } = require("../models/role-model")
const { checkPermissionsOtherwiseCreatePermission, getPermissionDocs } = require("../models/permission-model")

const getAllRoles = async () => {
  return await Roles.find()
}

const getOneRole = async (role) => {
  return await Roles.findOne({ role })
}

const getRolePermissions = async (id) => {
  return await Roles.findById(id).select("permissions")
}

const createRole = async (role) => {
  const { role: roleName, permissions } = role

  // find permission documents from the database
  // and add them to the role document
  // if the permission does not exist, create it
  await checkPermissionsOtherwiseCreatePermission(...permissions)

  // find permission documents from the database
  const permissionsDocuments = await getPermissionDocs(permissions)

  const newRole = new Roles({
    role: roleName,
    permissions: permissionsDocuments.map((permission) => permission._id),
  })

  return await newRole.save()
}

const assignPermissionToRole = async (id, permission) => {
  const role = await Roles.findById(id)

  if (!role) {
    return next(new AppError("No role found with that ID", 404))
  }

  const { permissions } = role
  const { permissions: permissionName } = permission

  // check if the permission exists in the database or create it
  await checkPermissionsOtherwiseCreatePermission(...permissionName)

  // find permission documents from the database
  const permissionDocument = await getPermissionDocs(permissionName)

  // add the permission to the role
  role.permissions = [...permissions, ...permissionDocument.map((permission) => permission._id)]

  return await role.save()
}

const updateRole = async (id, role) => {
  const { role: roleName, permissions } = role

  // check if the permissions exist in the database or create them
  await checkPermissionsOtherwiseCreatePermission(...permissions)

  // find permission documents from the database
  const permissionsDocuments = await getPermissionDocs(permissions)

  return await Roles.findByIdAndUpdate(
    id,
    {
      role: roleName,
      permissions: permissionsDocuments.map((permission) => permission._id),
    },
    { new: true }
  )
}

const deleteRole = async (id) => {
  return await Roles.findByIdAndDelete(id)
}

module.exports = {
  getAllRoles,
  getOneRole,
  getRolePermissions,
  createRole,
  updateRole,
  deleteRole,
  assignPermissionToRole,
}

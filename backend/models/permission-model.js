const mongoose = require("mongoose")
const { Schema, model } = mongoose

const permissionSchema = new Schema(
  {
    permission: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

const checkPermissionsOtherwiseCreatePermission = async (...permissions) => {
  for (const permission of permissions) {
    const permissionDocument = await Permissions.findOne({ permission })
    if (!permissionDocument) {
      await Permissions.create({ permission })
    }
  }
}

const getPermissionDocs = async (permissions) => {
  return await Permissions.find({ permission: { $in: permissions } })
}

const Permissions = model("Permissions", permissionSchema)

module.exports = {
  Permissions,
  checkPermissionsOtherwiseCreatePermission,
  getPermissionDocs,
}

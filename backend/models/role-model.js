const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Roles = model('Roles', roleSchema);

module.exports = {
  Roles,
};

const mongoose = require("mongoose")
const { Schema, model } = mongoose

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

const Departments = model("Departments", departmentSchema)

module.exports = {
  Departments,
}

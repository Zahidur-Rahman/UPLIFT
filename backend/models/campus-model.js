const mongoose = require("mongoose")
const { Schema, model } = mongoose

const campusSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    logo: {
      type: String,
      required: false,
    },
    departments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Departments",
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Campuses = model("Campuses", campusSchema)

module.exports = {
  Campuses,
}

const mongoose = require("mongoose")
const { Schema, model } = mongoose

const fundReqSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    goal_amount: {
      type: Number,
      required: [true, "Please provide the amount"],
    },
    raised_amount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed", "disabled"],
      default: "pending",
    },
    medical_records: {
      type: [String],
      required: false,
    },
    disease: {
      type: String,
      required: [true, "Please provide the reason"],
    },
    description: {
      type: String,
      required: false,
    },
    is_emergency: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    valid_until: {
      type: Date,
      required: [true, "Please provide the valid until date"],
    },
  },
  {
    timestamps: true,
  }
)

const FundRequests = model("FundRequests", fundReqSchema)

module.exports = {
  FundRequests,
}

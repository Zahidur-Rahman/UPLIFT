const mongoose = require("mongoose")
const { Schema, model } = mongoose

const donationSchema = new Schema(
  {
    donor: {
      name: {
        type: String,
        required: [true, "Please provide a name"],
      },
      email: {
        type: String,
        required: [true, "Please provide an email"],
      },
    },
    transaction_id: {
      type: String,
      required: [true, "Please provide a transaction id"],
    },
    fundreq_id: {
      type: Schema.Types.ObjectId,
      ref: "FundRequests",
      required: [true, "Please provide a fund request"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
)

const Donations = model("Donations", donationSchema)

module.exports = {
  Donations,
}

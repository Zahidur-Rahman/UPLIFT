const mongoose = require("mongoose")
const { Schema, model } = mongoose

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.Mixed,
      of: [
        String,
        {
          type: Object,
        },
      ],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
    },
  },
  {
    timestamps: true,
  }
)

const Comment = model("Comment", commentSchema)

module.exports = {
  Comment,
}

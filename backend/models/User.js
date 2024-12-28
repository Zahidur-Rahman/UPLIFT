const mongoose = require("mongoose")
const { Schema, model } = mongoose
const bcrypt = require("bcryptjs")
const Joi = require("joi")

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  avatar: {
    type: String,
    default: "https://api.dicebear.com/8.x/bottts/png?seed=0",
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin", "ambassador"],
    default: "user",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Departments",
    // required: [true, "Please provide a department"],
  },
  campus: {
    type: Schema.Types.ObjectId,
    ref: "Campuses",
    // required: [true, "Please provide a campus"],
  },
  isAmbassadorReq: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLoggedoutAt: Date,
})

//pre save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

//method to compare the password
userSchema.methods.comparePassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword)
}

//method to check if user logged out after the token was issued
userSchema.methods.lastLoggedoutAfter = function (JWTTimestamp) {
  if (this.lastLoggedoutAt) {
    const lastLoggedoutAt = parseInt(this.lastLoggedoutAt.getTime() / 1000, 10)
    return JWTTimestamp < lastLoggedoutAt
  }
  return false
}

const validateUser = async (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().required(),
    role: Joi.string(),
    department: Joi.string(),
    campus: Joi.string(),
    isAmbassadorReq: Joi.boolean(),
  })

  return schema.validate(user)
}

const User = model("User", userSchema)

module.exports = { User, validateUser }

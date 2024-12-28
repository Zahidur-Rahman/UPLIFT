const { promisify } = require("util")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const config = require("../config")

// Generate a JWT token
const generateJwtToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN || "1d", // Default to 1 day if not set in config
  })
}

// Verify a JWT token using promisify to handle the callback-based jwt.verify
const verifyJwtToken = async (token) => {
  try {
    // Use promisify to convert callback-based jwt.verify to a promise-based function
    return await promisify(jwt.verify)(token, config.JWT_SECRET)
  } catch (err) {
    throw new Error("Invalid or expired token! Please log in again.")
  }
}

// Hash a token using SHA-256 (used for secure storage of tokens like password reset tokens)
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex")
}

// Generate a random token (useful for password reset tokens, email verification tokens, etc.)
const generateRandomToken = () => {
  return crypto.randomBytes(20).toString("hex")
}

module.exports = { generateJwtToken, verifyJwtToken, hashToken, generateRandomToken }

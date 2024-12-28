const mongoose = require("mongoose")
const config = require("../config")

module.exports = async () => {
  await mongoose
    .connect(config.DATABASE_URL)
    .then(() => {
      console.log("Connected to the database")
    })
    .catch((err) => {
      console.log("Failed to connect to the database", err)
    })
}

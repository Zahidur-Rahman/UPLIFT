const { User } = require("../models/User")

const getOneUser = async (filter) => {
  return await User.findOne(filter)
}

module.exports = { getOneUser }

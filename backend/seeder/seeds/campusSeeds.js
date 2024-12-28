const campusFactory = require("../factories/campusFactory")

module.exports = async (type) => {
  if (type === "seed") {
    await campusFactory.seed(5)
  } else if (type === "drop") {
    await campusFactory.drop()
  }
}

const departmentFactory = require("../factories/departmentFactory")

module.exports = async (type) => {
  if (type === "seed") {
    await departmentFactory.seed(5)
  } else if (type === "drop") {
    await departmentFactory.drop()
  }
}

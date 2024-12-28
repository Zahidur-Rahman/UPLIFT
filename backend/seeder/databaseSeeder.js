const campusSeeds = require("./seeds/campusSeeds")
const departmentSeeds = require("./seeds/departmentSeeds")

const seed = async () => {
  if (process.argv[2] === "seed") {
    await campusSeeds("seed")
    await departmentSeeds("seed")
  } else if (process.argv[2] === "drop") {
    await campusSeeds("drop")
    await departmentSeeds("drop")
  }
}

module.exports = { seed }

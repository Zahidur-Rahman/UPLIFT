const { faker } = require("@faker-js/faker")
const seederFactory = require("../factories/seederFactory")
const Campuses = require("../../models/campus-model")
const Departments = require("../../models/department-model")

const seed = async (count = 1) => {
  const campuses = []
  for (let i = 0; i < count; i++) {
    campuses.push({
      name: faker.company.name(),
      logo: faker.image.imageUrl(),
      //add first 5 departments to the campus
      departments: await Departments.Departments.find().limit(5).select("_id"),
    })
  }
  await seederFactory.seedModel(Campuses.Campuses, campuses)
}

const drop = async () => {
  await seederFactory.dropModel(Campuses.Campuses)
}

module.exports = {
  seed,
  drop,
}

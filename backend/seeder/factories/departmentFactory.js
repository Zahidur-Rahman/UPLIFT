const { faker } = require("@faker-js/faker")
const seederFactory = require("../factories/seederFactory")
const Departments = require("../../models/department-model")

const seed = async (count = 1) => {
  const departments = []
  for (let i = 0; i < count; i++) {
    departments.push({
      name: faker.company.name(),
      email: faker.internet.email(),
    })
  }
  await seederFactory.seedModel(Departments.Departments, departments)
}

const drop = async () => {
  await seederFactory.dropModel(Departments.Departments)
}

module.exports = {
  seed,
  drop,
}

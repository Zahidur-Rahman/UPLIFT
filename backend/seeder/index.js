const databaseSeeder = require("./databaseSeeder")

require("../startup/db")()

const asyncWrapper = async () => {
  console.log("Seeding database...")
  await databaseSeeder.seed()
  console.log("Seeding completed.")
}

asyncWrapper()

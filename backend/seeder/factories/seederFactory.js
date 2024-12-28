const seedModel = async (model, data) => {
  try {
    console.log(`Seeding...`)

    await model.insertMany(data)

    console.log(`insertion completed.`)
  } catch (err) {
    console.log(`Error seeding: ${err.message}`)
  }
}

const dropModel = async (model) => {
  try {
    console.log(`Dropping...`)

    await model.deleteMany(data)

    console.log(`Dropping complete.`)
  } catch (err) {
    console.log(`Error dropping: ${err.message}`)
  }
}

module.exports = {
  seedModel,
  dropModel,
}

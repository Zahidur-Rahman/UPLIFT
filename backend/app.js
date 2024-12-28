const express = require("express")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const scheduledTasks = require("./utils/scheduledTask")

const app = express()
app.use(express.json())
app.use(cors())

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "public", "medical_records")
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Serve static files
app.use("/api/public", express.static(path.join(__dirname, "public")))

require("./startup/routes")(app)

module.exports = app

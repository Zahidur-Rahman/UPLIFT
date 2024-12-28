const express = require("express")
const campusController = require("../controllers/campus-controller")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/campus_logos")

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }

    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

// File filter function
const fileFilter = function (req, file, cb) {
  const allowedFileTypes = /jpeg|jpg|png/
  const mimeTypeMatch = allowedFileTypes.test(file.mimetype)
  const extNameMatch = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())

  if (mimeTypeMatch && extNameMatch) {
    cb(null, true)
  } else {
    cb(new Error("Error: Only jpeg, jpg, png files are supported"), false)
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter }).single("logo")

const router = express.Router()

router.get("/", campusController.getAllCampuses)
router.get("/departments", campusController.getAllDepartments)
router.get("/:id", campusController.getCampusById)
router.get("/:id/departments", campusController.getDepartmentsByCampusId)
router.post(
  "/create",
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err)
        return res.status(400).json({ message: err.message }) // Return Multer error
      }
      next()
    })
  },
  campusController.createCampus
)
router.post("/department/create", campusController.createDepartment)
module.exports = router

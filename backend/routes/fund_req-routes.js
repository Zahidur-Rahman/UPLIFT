const express = require("express")
const fundReqController = require("../controllers/fund_req-controller")
const { protect } = require("../middlewares/auth-middleware")
const multer = require("multer")
const path = require("path")

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/medical_records"))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

// File filter function to accept only certain file types
const fileFilter = function (req, file, cb) {
  const allowedFileTypes = /jpeg|jpg|png/
  const mimeTypeMatch = allowedFileTypes.test(file.mimetype)
  const extNameMatch = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())

  if (mimeTypeMatch && extNameMatch) {
    cb(null, true)
  } else {
    cb(new Error("Error: File upload only supports the following filetypes - jpeg, jpg, png"), false)
  }
}

// Initialize multer upload with configured storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter }).array("medical_records", 5)

const router = express.Router()

router.post("/create", protect, upload, fundReqController.createFundReq)
router.get("/emergency", fundReqController.getEmergencyFundReqs)
router.get("/all", fundReqController.getAllFundReqs)
router.get("/", fundReqController.getAllFundReqs)
router.get("/my", protect, fundReqController.getMyFundReqs)
router.get("/:id", fundReqController.getFundReqById)
router.put("/:id", protect, fundReqController.updateFundReq)
router.delete("/:id", protect, fundReqController.deleteFundReq)
router.get("/verify/:id", fundReqController.verifyFundReq)
router.get("/cancel/:id", fundReqController.cancelFundReq)
router.post("/add-comment/:id", fundReqController.addComment)
router.get("/get-comments/:id", fundReqController.getComments)
router.get("/all/:campus", fundReqController.getAllFundReqByCampus)
router.get("/emergency/all/:campus", fundReqController.getAllEmergencyFundReqsByCampus)
router.post("/make-emergency/:id", protect, fundReqController.makeEmergency)

module.exports = router

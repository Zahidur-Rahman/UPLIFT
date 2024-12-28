const express = require("express")
const reportController = require("../controllers/report-controller")
const { protect, restrictTo } = require("../middlewares/auth-middleware")

const router = express.Router()

router.get("/all", protect, restrictTo("admin"), reportController.getAdminReport)
router.get("/my", protect, reportController.getUserReport)

module.exports = router

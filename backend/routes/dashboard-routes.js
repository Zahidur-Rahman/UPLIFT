const express = require("express")
const dashboardController = require("../controllers/dashboard-controller")
const { protect } = require("../middlewares/auth-middleware")
const { restrictTo } = require("../middlewares/auth-middleware")

const router = express.Router()

router.get("/ambassador", protect, dashboardController.getAmbassadors)
router.get("/ambassador-requests", protect, restrictTo("admin"), dashboardController.getAmbassadorRequests)
router.get("/ambassador/:id", protect, restrictTo("admin"), dashboardController.getAmbassador)
router.post("/approve-ambassador/:id", protect, restrictTo("admin"), dashboardController.approveAmbassador)
router.post("/reject-ambassador/:id", protect, restrictTo("admin"), dashboardController.rejectAmbassador)

module.exports = router

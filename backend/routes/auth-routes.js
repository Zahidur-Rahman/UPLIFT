const express = require("express")
const authController = require("../controllers/auth-controller")
const { protect, restrictTo } = require("../middlewares/auth-middleware")

const router = express.Router()

router.post("/login", authController.login)
router.post("/register", authController.register)
router.get("/all", protect, authController.getAllUsers)

router.get("/logout", protect, authController.logout)

module.exports = router

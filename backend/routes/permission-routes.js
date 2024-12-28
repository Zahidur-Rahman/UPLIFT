const express = require("express")
const permissionController = require("../controllers/permission-controller")
const { protect, restrictTo } = require("../middlewares/auth-middleware")

const router = express.Router()

router.get("/", protect, restrictTo("admin"), permissionController.getAllPermissions)
router.post("/", protect, restrictTo("admin"), permissionController.createPermission)
router.patch("/:id", protect, restrictTo("admin"), permissionController.updatePermission)
router.delete("/:id", protect, restrictTo("admin"), permissionController.deletePermission)

module.exports = router

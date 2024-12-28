const express = require("express")
const roleController = require("../controllers/role-controller")
const { protect, restrictTo } = require("../middlewares/auth-middleware")

const router = express.Router()

//create role route with permission

router.get("/", protect, restrictTo("read-role"), roleController.getAllRoles)
router.get("/:id/permissions", protect, restrictTo("admin"), roleController.getRolePermissions)
router.post("/:id/permissions", protect, restrictTo({ role: "admin" }), roleController.assignPermissionToRole)
router.post("/", protect, restrictTo("create-role"), roleController.createRole)
router.patch("/:id", protect, restrictTo("admin"), roleController.updateRole)
router.delete("/:id", protect, restrictTo("admin"), roleController.deleteRole)

module.exports = router

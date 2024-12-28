const express = require("express")
const donateController = require("../controllers/donate-controller")
const { protect } = require("../middlewares/auth-middleware")

const router = express.Router()

router.post("/", donateController.makeDonation)
router.post("/success/:id", donateController.donationSuccess)
router.post("/fail/:id", donateController.donationFail)
router.get("/total", donateController.getTotalDonations)

module.exports = router

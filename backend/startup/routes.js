const authRoutes = require("../routes/auth-routes")
const AppError = require("../utils/app-error")
const permissionsRoutes = require("../routes/permission-routes")
const roleRoutes = require("../routes/role-routes")
const globalErrorHandler = require("../middlewares/error-middleware")
const campusRoutes = require("../routes/campus-routes")
const fund_reqRoutes = require("../routes/fund_req-routes")
const donateRoutes = require("../routes/donate-routes")
const dashboardRoutes = require("../routes/dashboard-routes")
const reportRoutes = require("../routes/report-routes")
const path = require("path")

module.exports = (app) => {
  app.use("/api/auth", authRoutes)
  app.use("/api/permissions", permissionsRoutes)
  app.use("/api/roles", roleRoutes)
  app.use("/api/campus", campusRoutes)
  app.use("/api/fundreq", fund_reqRoutes)
  app.use("/api/donate", donateRoutes)
  app.use("/api/dashboard", dashboardRoutes)
  app.use("/api/report", reportRoutes)
  app.use("/api/test", (req, res) => {
    res.status(200).json({ message: "Test route" })
  })

  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
  })

  app.use(globalErrorHandler)
}

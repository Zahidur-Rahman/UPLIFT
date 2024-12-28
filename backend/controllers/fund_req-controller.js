const catchAsync = require("../utils/catch-async")
const AppError = require("../utils/app-error")
const { FundRequests } = require("../models/fund_req-model")
const { sendVerificationEmail } = require("../services/email-service")
const { Departments } = require("../models/department-model")
const { Campuses } = require("../models/campus-model")
const { User } = require("../models/User")
const { Comment } = require("../models/comment-model")
//config for file upload
const config = require("../config/index")

const createFundReq = catchAsync(async (req, res, next) => {
  try {
    // Check if files were uploaded successfully
    if (!req.files || req.files.length === 0) {
      console.error("No files uploaded")
      return res.status(400).json({ message: "No files uploaded" })
    }

    // Access the uploaded files details
    const filePaths = req.files.map((file) => `/public/medical_records/${file.filename}`)
    const originalFileNames = req.files.map((file) => file.originalname)

    // Process other request data (e.g., goal_amount, disease, description, valid_until)
    const { goal_amount, disease, description, valid_until } = req.body

    if (!goal_amount || !disease || !description || !valid_until) {
      console.error("Missing required fields: goal_amount, disease, description, valid_until")
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Save file paths and request details to database or perform other operations
    const newFundRequest = {
      goal_amount,
      disease,
      description,
      medical_records: filePaths, // Store file paths in database
      valid_until, // Save valid_until date in the database
    }

    // Example: Database save operation (using Mongoose as an example)
    const savedFundRequest = await FundRequests.create(newFundRequest)

    // Get department id from user
    const departmentId = req.user.department
    const campusId = req.user.campus

    // Find department with id and get the email
    const department = await Departments.findById(departmentId)
    if (!department) {
      console.error(`Department not found with ID: ${departmentId}`)
      return res.status(404).json({ message: "Department not found" })
    }
    const departmentEmail = department.email

    const campus = await Campuses.findById(campusId)
    if (!campus) {
      console.error(`Campus not found with ID: ${campusId}`)
      return res.status(404).json({ message: "Campus not found" })
    }

    // Add campus and department with user details
    const user = req.user
    user.campus_name = campus.name
    user.department_name = department.name
    user.fundreq = savedFundRequest

    // Send email to department email with user details and uploaded files
    await sendVerificationEmail(departmentEmail, user, filePaths)

    return res.status(201).json({ message: "Fund request created successfully", fundRequest: newFundRequest })
  } catch (error) {
    console.error("Error creating fund request:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
})

const getAllFundReqs = catchAsync(async (req, res, next) => {
  //sort by emergency and then by date and status = approved
  const fundReqs = await FundRequests.find({ status: "approved" }).sort({ is_emergency: -1, createdAt: -1 })

  res.status(200).json({ status: "success", fundReqs })
})

const getAllFundReqByCampus = catchAsync(async (req, res, next) => {
  const campusId = req.params.id
  const fundReqs = await FundRequests.find({ campus: campusId })

  res.status(200).json({ status: "success", fundReqs })
})

const getAllEmergencyFundReqsByCampus = catchAsync(async (req, res, next) => {
  const campusId = req.params.id
  //get emergency fund requests which is not completed
  const fundReqs = await FundRequests.find({ campus: campusId, is_emergency: true, status: { $ne: "completed" } })

  res.status(200).json({ status: "success", fundReqs })
})

const getEmergencyFundReqs = catchAsync(async (req, res, next) => {
  //get latest 3 fund requests
  const fundReqs = await FundRequests.find({ is_emergency: true, status: { $ne: "completed" } })
    .sort({ createdAt: -1 })
    .limit(3)

  res.status(200).json({ status: "success", fundReqs })
})

const getMyFundReqs = catchAsync(async (req, res, next) => {
  const fundReqs = await FundRequests.find({ user: req.user._id })

  res.status(200).json({ status: "success", fundReqs })
})

const getFundReqById = catchAsync(async (req, res, next) => {
  const fundReq = await FundRequests.findById(req.params.id)
  // pass fundReq.medical_records to the view

  if (!fundReq) {
    return next(new AppError("Fund Request not found", 404))
  }

  const baseUrl = `${config.BASE_URL}`
  fundReq.medical_records = fundReq.medical_records.map((record) => {
    const fileUrl = baseUrl + record
    return fileUrl
  })

  res.status(200).json({ status: "success", fundReq })
})

const updateFundReq = catchAsync(async (req, res, next) => {
  const fundReq = await FundRequests.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

  if (!fundReq) {
    return next(new AppError("Fund Request not found", 404))
  }

  res.status(200).json({ status: "success", fundReq })
})

const deleteFundReq = catchAsync(async (req, res, next) => {
  const fundReq = await FundRequests.findByIdAndDelete(req.params.id)

  if (!fundReq) {
    return next(new AppError("Fund Request not found", 404))
  }

  res.status(204).json({ status: "success", fundReq })
})

const verifyFundReq = catchAsync(async (req, res, next) => {
  const fundReq = await FundRequests.findById(req.params.id)

  if (!fundReq) {
    return next(new AppError("Fund Request not found", 404))
  }

  // Perform verification logic here (e.g., update status, send email to user)
  // Example: Update status to verified
  fundReq.status = "approved"
  await fundReq.save()

  // // Example: Send email to user
  // const user = req.user
  // const email = user.email
  // await sendVerificationEmail(email, user, fundReq.medical_records)

  //redirect with success message
  res.redirect(`${config.FRONTEND_URL}/?status=success&message=Fund%20Request%20verified%20successfully`)
})

const cancelFundReq = catchAsync(async (req, res, next) => {
  const fundReq = await FundRequests.findById(req.params.id)

  if (!fundReq) {
    return next(new AppError("Fund Request not found", 404))
  }

  // Perform cancellation logic here (e.g., update status, send email to user)
  // Example: Update status to cancelled
  fundReq.status = "rejected"
  await fundReq.save()

  // // Example: Send email to user
  // const user = req.user
  // const email = user.email
  // await sendVerificationEmail(email, user, fundReq.medical_records)

  //redirect with success message
  res.redirect(`${config.FRONTEND_URL}/?status=success&message=Fund%20Request%20cancelled%20successfully`)
})

const addComment = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const fundReq = await FundRequests.findById(id)

  if (!fundReq) {
    return next(new AppError("Fund Request not found", 404))
  }

  const newComment = {
    user: req.body.user,
    comment: req.body.comment,
  }
  const comment = await Comment.create(newComment)

  fundReq.comments.push(comment._id)
  await fundReq.save()

  res.status(200).json({ status: "success", fundReq, message: "Comment added successfully" })
})

const getComments = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const fundReq = await FundRequests.findById(id).populate("comments")

  if (!fundReq) {
    return next(new AppError("Fund Request not found", 404))
  }

  res.status(200).json({ status: "success", comments: fundReq.comments })
})

const makeEmergency = catchAsync(async (req, res, next) => {
  const fundReq = await FundRequests.findById(req.params.id)

  if (!fundReq) {
    return next(new AppError("Fund Request not found", 404))
  }

  fundReq.is_emergency = true
  await fundReq.save()

  res.status(200).json({ status: "success", fundReq, message: "Fund Request marked as emergency" })
})

module.exports = { createFundReq, getMyFundReqs, getFundReqById, updateFundReq, deleteFundReq, getEmergencyFundReqs, verifyFundReq, cancelFundReq, getAllFundReqs, addComment, getComments, getAllFundReqByCampus, getAllEmergencyFundReqsByCampus, makeEmergency }

const catchAsync = require("../utils/catch-async")
const AppError = require("../utils/app-error")

const { Campuses } = require("../models/campus-model")
const { Departments } = require("../models/department-model")

exports.getAllCampuses = catchAsync(async (req, res, next) => {
  const campuses = await Campuses.find()

  res.status(200).json({
    status: "success",
    Message: "All Campuses",
    campuses,
  })
})

exports.getAllDepartments = catchAsync(async (req, res, next) => {
  const departments = await Departments.find()

  res.status(200).json({
    status: "success",
    Message: "All Departments",
    departments,
  })
})

exports.getCampusById = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const campus = await Campuses.findById(id)

  if (!campus) {
    return next(new AppError("Campus not found", 404))
  }

  const departments = await Departments.find({ _id: { $in: campus.departments } })

  res.status(200).json({
    status: "success",
    Message: "Campus",
    departments,
  })
})

exports.getDepartmentsByCampusId = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const campus = await Campuses.findById(id)

  if (!campus) {
    return next(new AppError("Campus not found", 404))
  }

  const departments = await Departments.find({ _id: { $in: campus.departments } })

  res.status(200).json({
    status: "success",
    Message: "Departments",
    departments,
  })
})

exports.createCampus = async (req, res) => {
  try {
    // Check if the logo was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Logo file is required." })
    }

    // Access the uploaded logo file details
    const logoPath = `/public/campus_logos/${req.file.filename}` // Store logo path relative to your public folder
    const originalFileName = req.file.originalname

    // Process other request data (e.g., campus name, departments)
    const { name, departments } = req.body

    if (!name || !departments) {
      console.error("Missing required fields: name or departments")
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Create a new campus
    const campus = new Campuses({
      name,
      logo: logoPath,
      departments: JSON.parse(req.body.departments),
    })

    await campus.save()
    res.status(201).json({ message: "Campus created successfully", campus })
  } catch (error) {
    console.error("Error creating campus:", error)
    res.status(500).json({ message: "Internal Server Error", error })
  }
}

exports.createDepartment = async (req, res) => {
  try {
    const { campusId, name, email } = req.body

    // Create new department
    const department = new Departments({ name, email })
    await department.save()

    // Add department to the selected campus
    const campus = await Campuses.findById(campusId)
    campus.departments.push(department._id)
    await campus.save()

    res.status(201).json({ message: "Department created successfully", department })
  } catch (err) {
    res.status(500).json({ message: "Failed to create department", error: err.message })
  }
}

// src/hooks/useRegister.js
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import { registerSchema } from "../schemas"
import { getAllCampuses, getDepartmentsByCampusId } from "../services/apiCampuses"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  campus: "",
  department: "",
  isAmbassadorReq: false,
}

export const useRegister = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [campuses, setCampuses] = useState([])
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const campuses = await getAllCampuses()
        setCampuses(campuses.campuses)
      } catch (err) {
        toast.error(err.message)
      }
    }
    fetchCampuses()
  }, [])

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setError(null)
      setIsLoading(true)
      try {
        await register(values)
        if (values.isAmbassadorReq) {
          toast.success("You are requested ad an ambassador")
          navigate("/")
        } else {
          toast.success("Account created successfully")
          navigate("/login")
        }
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
      }
      setIsLoading(false)
    },
  })

  const handleDepartmentChange = async (e) => {
    const selectedCampusId = e.target.value
    if (!selectedCampusId) {
      setDepartments([]) // Clear departments if no campus selected
      return
    }
    try {
      values.campus = selectedCampusId
      const { departments } = await getDepartmentsByCampusId(selectedCampusId)
      setDepartments(departments)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isLoading,
    campuses,
    departments,
    handleDepartmentChange,
  }
}

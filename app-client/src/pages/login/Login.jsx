import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useFormik } from "formik"
import "./Login.css"
import toast from "react-hot-toast"
import { LocalStorage } from "../../utils"
import { Link } from "react-router-dom" // Import Link from React Router
import { loginSchema } from "../../schemas"

const initialValues = {
  email: "",
  password: "",
}

const Login = () => {
  const isAuthenticated = LocalStorage.get("user") ? true : false
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setError(null)
      setIsLoading(true)
      try {
        await login(values.email, values.password)
        toast.success("Login successful")
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
      }
      setIsLoading(false)
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard"
    }
  }, [isAuthenticated])

  return (
    <div className="container login-container text-center" style={styles.container}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 login-form-1" style={styles.formContainer}>
          <h3 style={styles.heading}>Sign in to your account</h3>
          <form onSubmit={handleSubmit} method="POST">
            <div className="form-group mb-3">
              <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" value={values.email} onChange={handleChange} autoComplete="email" style={styles.input} />
              {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : null}
            </div>
            <div className="form-group mb-3">
              <input type="password" id="password" name="password" className="form-control" placeholder="Enter your password" value={values.password} onChange={handleChange} autoComplete="current-password" style={styles.input} />
              {errors.password && touched.password ? <p className="text-danger">{errors.password}</p> : null}
            </div>
            <div className="form-group mb-3">
              <input type="submit" className="btnSubmit" value={isLoading ? "Signing in..." : "Sign in"} disabled={isLoading} style={styles.submitButton} />
            </div>
            <div className="form-group">
              <a href="#" className="ForgetPwd" style={styles.forgetPwd}>
                Forget Password?
              </a>
            </div>
          </form>
          <div className="form-group">
            <p style={styles.signupText}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.signupLink}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

const styles = {
  container: {
    padding: "3rem 0",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    border: "2px solid #5abfab",
  },
  heading: {
    color: "#5abfab",
    marginBottom: "1.5rem",
  },
  input: {
    border: "2px solid #5abfab",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
  },
  submitButton: {
    backgroundColor: "#5abfab",
    border: "none",
    padding: "10px 20px",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  forgetPwd: {
    color: "#5abfab",
    textDecoration: "none",
    fontSize: "14px",
  },
  signupText: {
    marginTop: "1rem",
    fontSize: "14px",
  },
  signupLink: {
    color: "#5abfab",
    textDecoration: "underline",
    fontWeight: "bold",
  },
}

import { Link } from "react-router-dom"
import "./Register.css"
import { useRegister } from "../../utils/useRegister"

export default function Register() {
  const { values, errors, touched, handleChange, handleSubmit, isLoading, campuses, departments, handleDepartmentChange } = useRegister()

  return (
    <div className="container register-container text-center" style={styles.container}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 register-form-1" style={styles.formContainer}>
          <h3 style={styles.heading}>Create an account</h3>
          <form onSubmit={handleSubmit} method="POST">
            <div className="form-group mb-3 mx-4">
              <input type="text" id="name" name="name" className="form-control" placeholder="Enter your name" value={values.name} onChange={handleChange} autoComplete="name" style={styles.input} />
              {errors.name && touched.name ? <p className="text-danger">{errors.name}</p> : null}
            </div>
            <div className="form-group mb-3 mx-4">
              <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" value={values.email} onChange={handleChange} autoComplete="email" style={styles.input} />
              {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : null}
            </div>
            <div className="form-group mb-3 mx-4">
              <input type="text" id="phone" name="phone" className="form-control" placeholder="phone number (Ex: +88019...)" value={values.phone} onChange={handleChange} autoComplete="phone" style={styles.input} />
              {errors.phone && touched.phone ? <p className="text-danger">{errors.phone}</p> : null}
            </div>
            <div className="form-group mb-3 mx-4">
              <input type="password" id="password" name="password" className="form-control" placeholder="Enter your password" value={values.password} onChange={handleChange} autoComplete="current-password" style={styles.input} />
              {errors.password && touched.password ? <p className="text-danger">{errors.password}</p> : null}
            </div>
            <div className="form-group mb-3 mx-4">
              <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm your password" value={values.confirmPassword} onChange={handleChange} autoComplete="current-password" style={styles.input} />
              {errors.confirmPassword && touched.confirmPassword ? <p className="text-danger">{errors.confirmPassword}</p> : null}
            </div>
            <div className="form-group mb-3 mx-4">
              <div className="select-wrapper">
                <select
                  id="campus"
                  name="campus"
                  className="form-control select-input"
                  value={values.campus}
                  onChange={(e) => {
                    handleChange(e)
                    handleDepartmentChange(e)
                  }}
                >
                  <option value="" key={0}>
                    Select your campus
                  </option>
                  {campuses.map((campus) => (
                    <option key={campus._id} value={campus._id}>
                      {campus.name}
                    </option>
                  ))}
                </select>
                <span className="select-icon">▼</span>
              </div>
              {errors.campus && touched.campus ? <p className="text-danger">{errors.campus}</p> : null}
            </div>
            <div className="form-group mb-3 mx-4">
              <div className="select-wrapper">
                <select id="department" name="department" className="form-control select-input" value={values.department} onChange={handleChange}>
                  <option value="" key={0}>
                    Select your department
                  </option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                <span className="select-icon">▼</span>
              </div>
              {errors.department && touched.department ? <p className="text-danger">{errors.department}</p> : null}
            </div>
            <div className="form-group mb-3 mx-4">
              <input type="submit" className="btnSubmit" value={isLoading ? "Signing up..." : "Sign up"} disabled={isLoading} style={styles.submitButton} />
            </div>
          </form>
          <div className="form-group mt-3">
            <Link to="/login" className="login-link">
              Already have an account?{" "}
              <b>
                <u style={{ color: "#5abfab" }}>Sign in</u>
              </b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    padding: "10px 15px", // Added padding for left and right
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
}

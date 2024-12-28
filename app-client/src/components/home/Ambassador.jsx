import React from "react"
import { useRegister } from "../../utils/useRegister"

export default function Ambassador() {
  const { values, errors, touched, handleChange, handleSubmit, isLoading, campuses, departments, handleDepartmentChange } = useRegister()
  values.isAmbassadorReq = true
  return (
    <section className="volunteer-section section-padding" id="section_4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <h2 className="text-white mb-4">Ambassador</h2>

            <form className="custom-form volunteer-form mb-5 mb-lg-0" onSubmit={handleSubmit} method="POST">
              <h3 className="mb-4">Become an ambassador today</h3>

              <div className="row">
                <div className="col-lg-6 col-12">
                  <input type="text" name="name" value={values.name} onChange={handleChange} id="volunteer-name" className="form-control" placeholder="Full Name" required />
                  {errors.name && touched.name ? <p className="text-danger">{errors.name}</p> : null}
                </div>

                <div className="col-lg-6 col-12">
                  <input type="email" name="email" value={values.email} onChange={handleChange} id="volunteer-email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Your Email" required />
                  {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : null}
                </div>

                <div className="col-lg-6 col-12">
                  <input type="text" name="phone" value={values.phone} onChange={handleChange} id="volunteer-password" className="form-control" placeholder="+88019...." required />
                  {errors.phone && touched.phone ? <p className="text-danger">{errors.phone}</p> : null}
                </div>

                <div className="col-lg-6 col-12">
                  <input type="password" name="password" value={values.password} onChange={handleChange} id="volunteer-confirm-password" className="form-control" placeholder="Enter password" required />
                  {errors.password && touched.password ? <p className="text-danger">{errors.password}</p> : null}
                </div>

                <div className="col-lg-6 col-12">
                  <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm your password" value={values.confirmPassword} onChange={handleChange} autoComplete="current-password" />
                  {errors.confirmPassword && touched.confirmPassword ? <p className="text-danger">{errors.confirmPassword}</p> : null}
                </div>

                <div className="col-lg-6 col-12">
                  <select
                    id="campus"
                    name="campus"
                    className="form-control"
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
                  {errors.campus && touched.campus ? <p className="text-danger">{errors.campus}</p> : null}
                </div>
                <div className="col-lg-6 col-12">
                  <select id="department" name="department" className="form-control" value={values.department} onChange={handleChange}>
                    <option value="" key={0}>
                      Select your department
                    </option>
                    {departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  {errors.department && touched.department ? <p className="text-danger">{errors.department}</p> : null}
                </div>
              </div>

              <textarea name="volunteer-message" rows="3" className="form-control" id="volunteer-message" placeholder="Comment (Optional)"></textarea>

              <button type="submit" className="form-control">
                Submit
              </button>
            </form>
          </div>

          <div className="col-lg-6 col-12">
            <img src="images/volunteer.jpg" className="volunteer-image img-fluid" alt="" />

            <div className="custom-block-body text-center">
              <h4 className="text-white mt-lg-3 mb-lg-3">Ambassador at Uplift</h4>

              <p className="text-white">Join us as an ambassador for our philanthropic initiatives, aiding in the betterment of students through your support and dedication</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useEffect, useState } from "react"
import Layout from "../layouts/Layout"
import { useFormik } from "formik"
import { donationSchema } from "../schemas"
import { useParams } from "react-router-dom"
import { makeDonation } from "../services/apiFundReq"
import toast from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LocalStorage } from "../utils"

export default function MakeDonation() {
  const user = LocalStorage.get("user")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    amount: "",
    anonymous: false,
    name: user ? user.username : "",
    email: user ? user.email : "",
  }

  const fundReqId = useParams().id

  const { errors, touched, values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: donationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      setError("")
      try {
        const newValue = {
          amount: values.amount,
          anonymous: values.anonymous,
          donor: user ? { name: user.username, email: user.email } : { name: values.name, email: values.email },
          fundreq_id: fundReqId,
        }
        const res = await makeDonation(newValue)
        window.location.href = res.url
      } catch (err) {
        setError(err.message)
        console.log("Error", err)
      }
      setIsLoading(false)
    },
  })

  return (
    <Layout>
      <section className="donate-section">
        <div className="section-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mx-auto">
              <form className="custom-form donate-form" action="#" method="get" role="form" onSubmit={handleSubmit}>
                <h3 className="mb-4">Make a donation</h3>

                <div className="row">
                  <div className="col-lg-12 col-12">
                    <h5 className="mt-2 mb-3">Enter an amount</h5>
                  </div>

                  <div className="col-lg-12 col-12 form-check-group">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        $
                      </span>
                      <input type="text" className="form-control" id="amount" name="amount" placeholder="Custom amount" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} value={values.amount} />
                      {errors.amount && touched.amount && <p className="text-danger">{errors.amount}</p>}
                    </div>
                  </div>

                  {!user && (
                    <>
                      <div className="col-lg-12 col-12">
                        <h5 className="mt-1">Personal Info</h5>
                      </div>
                      <div className="col-lg-6 col-12 mt-2">
                        <input type="text" name="name" id="name" className="form-control" placeholder="Jack Doe" required onChange={handleChange} value={values.name} />
                      </div>
                      <div className="col-lg-6 col-12 mt-2">
                        <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Jackdoe@gmail.com" required onChange={handleChange} value={values.email} />
                      </div>
                    </>
                  )}

                  <div className="col-lg-12 col-12">
                    <h5 className="mt-4 pt-1">Choose Donation Type</h5>
                  </div>

                  <div className="col-lg-12 col-12 mt-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="anonymous" id="flexRadioDefault10" onChange={handleChange} checked={values.anonymous} />
                      <label className="form-check-label" htmlFor="flexRadioDefault10">
                        Anonymous
                      </label>
                    </div>

                    <button type="submit" className="form-control mt-4">
                      {isLoading ? "Loading..." : "Donate"}
                    </button>
                  </div>
                </div>
              </form>
              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

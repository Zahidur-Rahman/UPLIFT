import React, { useState } from "react"
import "./CreateFundReq.css"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { fundReqSchema } from "../../schemas"
import toast from "react-hot-toast"
import { createFundReq } from "../../services/apiFundReq"
import Layout from "../../layouts/Layout"
import { useDropzone } from "react-dropzone"

export default function CreateFundReq() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const initialValues = {
    goal_amount: "",
    disease: "",
    description: "",
    medical_records: [],
    valid_until: "",
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: fundReqSchema,
    onSubmit: async (values) => {
      setError(null)
      setIsLoading(true)
      try {
        await createFundReq(values)
        navigate("/")
        toast.success("Fund request created successfully")
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
      }
      setIsLoading(false)
    },
  })

  const onDrop = (acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
    setFieldValue("medical_records", [...values.medical_records, ...filesWithPreview])
  }

  const removeFile = (index) => {
    const newFiles = [...values.medical_records]
    newFiles.splice(index, 1)
    setFieldValue("medical_records", newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Layout>
      <div className="container login-container text-center" style={{ padding: "2rem" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 login-form-1" style={styles.formContainer}>
            <h3 style={styles.heading}>Create a Fund Request</h3>
            <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
              <div className="form-group mb-3">
                <input type="number" className="form-control" id="goal_amount" name="goal_amount" placeholder="Goal Amount" value={values.goal_amount} onChange={handleChange} style={styles.input} />
                {errors.goal_amount && touched.goal_amount ? <p className="text-danger">{errors.goal_amount}</p> : null}
              </div>
              <div className="form-group mb-3">
                <input className="form-control" name="disease" placeholder="Reason" value={values.disease} onChange={handleChange} style={styles.input} />
                {errors.disease && touched.disease ? <p className="text-danger">{errors.disease}</p> : null}
              </div>
              <div className="form-group mb-3">
                <textarea className="form-control" name="description" placeholder="Reason Description" value={values.description} onChange={handleChange} style={{ ...styles.input, height: "100px" }} />
                {errors.description && touched.description ? <p className="text-danger">{errors.description}</p> : null}
              </div>
              <div className="form-group mb-3">
                <input type="date" className="form-control" name="valid_until" placeholder="Valid Until" value={values.valid_until} onChange={handleChange} style={styles.input} />
                {errors.valid_until && touched.valid_until ? <p className="text-danger">{errors.valid_until}</p> : null}
              </div>
              <div className="form-group mb-3">
                <div {...getRootProps({ className: "dropzone" })} style={styles.dropzone}>
                  <input {...getInputProps()} />
                  {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                </div>
                {values.medical_records && values.medical_records.length > 0 && (
                  <div className="preview-container" style={styles.previewContainer}>
                    {values.medical_records.map((file, index) => (
                      <div key={index} className="preview-item" style={styles.previewItem}>
                        <img src={file.preview} alt={`Preview ${index}`} className="preview-image" style={styles.previewImage} />
                        <button type="button" className="remove-button" onClick={() => removeFile(index)} style={styles.removeButton}>
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.medical_records && touched.medical_records ? <p className="text-danger">{errors.medical_records}</p> : null}
              </div>
              <div className="form-group mb-3">
                <input type="submit" className="btnSubmit" value={isLoading ? "Creating..." : "Create"} disabled={isLoading} style={styles.submitButton} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const styles = {
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
  dropzone: {
    border: "2px dashed #5abfab",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    color: "#5abfab",
    textAlign: "center",
  },
  previewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },
  previewItem: {
    position: "relative",
    display: "inline-block",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  removeButton: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#5abfab",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "12px",
    width: "20px",
    height: "20px",
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

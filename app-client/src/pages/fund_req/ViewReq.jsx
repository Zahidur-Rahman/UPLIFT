import React, { useEffect, useState } from "react"
import Layout from "../../layouts/Layout"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { getFundReqById } from "../../services/apiFundReq"
import { useAuth } from "../../context/AuthContext"
import { useFormik } from "formik"
import { commentSchema } from "../../schemas"
import { addComment, getComments } from "../../services/apiFundReq"
import { LocalStorage } from "../../utils"

export default function ViewReq() {
  const user = LocalStorage.get("user")
  const id = useParams().id

  const [fundReq, setFundReq] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchFundReq = async () => {
      try {
        const response = await getFundReqById(id)
        setFundReq(response.fundReq)
      } catch (error) {
        toast.error("Error fetching fund request")
      } finally {
        setLoading(false)
      }
    }

    const fetchComments = async () => {
      try {
        const response = await getComments(id)
        setComments(response.comments)
      } catch (error) {
        toast.error("Error fetching comments")
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
    fetchFundReq()
  }, [id, comment])

  const initialValues = {
    comment: "",
    user: user ? user : "Anonymous",
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: commentSchema,
    onSubmit: async (values) => {
      setLoading(true)
      setError("")
      try {
        const response = await addComment(id, values)
        toast.success(response.message)
        values.comment = ""
        setComment(...comments, "new comment")
      } catch (error) {
        setError(error.message)
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <Layout>
      {loading && <p>Loading...</p>}
      <main>
        <section className="news-section section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12">
                <div className="news-block">
                  <div className="news-block-info">
                    <div className="d-flex mt-2">
                      <div className="news-block-date">
                        <p>
                          <i className="bi-calendar4 custom-icon me-1"></i>
                          {new Date(fundReq.createdAt).toDateString()}
                        </p>
                      </div>

                      <div className="news-block-comment mx-3">
                        <p>
                          <i className="bi-chat-left custom-icon me-1"></i>
                          {comments.length} Comments
                        </p>
                      </div>
                      <div className="news-block-comment">
                        <p>
                          {/* valid-till */}
                          <i className="bi-clock custom-icon me-1"></i>
                          {new Date(fundReq.valid_until).toDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="news-block-title mb-2">
                      <h4>{fundReq.disease}</h4>
                    </div>

                    <div className="news-block-body">
                      <p>
                        <strong>Details: </strong> {fundReq.description}
                      </p>
                    </div>
                    <div className="row mt-5 mb-4">
                      <p>
                        <strong>Medical Reports: </strong>
                      </p>
                      {fundReq.medical_records &&
                        fundReq.medical_records.map((record, index) => (
                          <div className="col-lg-6 col-12 mb-4 mb-lg-0" key={index}>
                            <img src={record} className="news-detail-image img-fluid" alt="" />
                          </div>
                        ))}
                    </div>

                    <div className="social-share border-top mt-5 py-4 d-flex flex-wrap align-items-center">
                      <div className="">
                        <a href={`/donate/${fundReq._id}`} className="btn" style={{ width: "18rem", backgroundColor: "#5bc0ab", color: "white", fontWeight: "bolder", borderRadius: "100px", padding: "0.8rem 0px" }}>
                          Donate Now
                        </a>
                      </div>
                    </div>

                    <form className="custom-form comment-form mt-4" onSubmit={handleSubmit} method="post" role="form">
                      <h6 className="mb-3">Write a comment</h6>

                      <textarea name="comment" rows="4" className="form-control" id="comment-message" placeholder="Your comment here" onChange={handleChange} value={values.comment}></textarea>

                      {errors.comment && <p className="text-danger">{errors.comment}</p>}
                      <div className="col-lg-3 col-md-4 col-6 ms-auto">
                        <button type="submit" className="form-control">
                          Comment
                        </button>
                      </div>
                    </form>

                    <div className="tags-block d-inline-block mt-4">
                      <a className="tags-block-link">Comments</a>
                    </div>
                    {comments.length > 0 &&
                      comments.map((comment, index) => {
                        return (
                          <div className="author-comment d-flex mt-3 mb-4" key={index}>
                            <img src={comment.user == `Anonymous` ? `https://api.dicebear.com/8.x/bottts/png?seed=Annoymous` : comment.user.avatar} className="img-fluid avatar-image" alt="" />

                            <div className="author-comment-info ms-3">
                              <h6 className="mb-1">{comment.user == `Anonymous` ? `Anonymous` : comment.user.username}</h6>

                              <p className="mb-0">{comment.comment}</p>

                              <div className="d-flex mt-2">
                                <a href="#" className="author-comment-link me-3">
                                  Like
                                </a>

                                <a href="#" className="author-comment-link">
                                  Reply
                                </a>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

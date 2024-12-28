import React, { useEffect } from "react"
import toast from "react-hot-toast"
import Layout from "../layouts/Layout"

export default function Success() {
  return (
    <Layout>
      <div className="text-center p-5">
        <h1>Success</h1>
        <p>Thank you for your donation!</p>
      </div>
    </Layout>
  )
}

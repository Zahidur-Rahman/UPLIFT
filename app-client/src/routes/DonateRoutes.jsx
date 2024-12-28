import React from "react"
import { Routes, Route } from "react-router-dom"
import Success from "../pages/Success"
import Failed from "../pages/Failed"
import MakeDonation from "../pages/MakeDonation"

export default function DonateRoutes() {
  return (
    <Routes>
      <Route path="/:id" element={<MakeDonation />} />
      <Route path="/success/:id" element={<Success />} />
      <Route path="/fail/:id" element={<Failed />} />
    </Routes>
  )
}

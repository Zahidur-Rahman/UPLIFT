import { Routes, Route } from "react-router-dom"
import BasicRoutes from "./BasicRoutes"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import DashboardRoutes from "./DashboardRoutes"
import DonateRoutes from "./DonateRoutes"
import FundReqRoutes from "./FundReqRoutes"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"

export default function Router() {
  const isAuthenticated = localStorage.getItem("user") ? true : false

  return (
    <Routes>
      <Route path="/*" element={<BasicRoutes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/*" element={isAuthenticated ? <DashboardRoutes /> : <Login />} />
      <Route path="/fund-req/*" element={<FundReqRoutes />} />
      <Route path="/donate/*" element={<DonateRoutes />} />
    </Routes>
  )
}

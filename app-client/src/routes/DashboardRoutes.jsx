import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/dashboard/Dashboard"
import AmbassadorList from "../pages/dashboard/AmbassadorList"
import AmbassadorReq from "../pages/dashboard/AmbassadorReq"
import EmergencyList from "../pages/dashboard/EmergencyList"
import FundReqListByCampus from "../pages/dashboard/FundReqListByCampus"
import MyAmbassador from "../pages/dashboard/MyAmbassador"
import CampusList from "../pages/dashboard/CampusList"
import UserList from "../pages/dashboard/UserList"

export default function DashboardRoutes() {
  const isAdmin = JSON.parse(localStorage.getItem("user")).role === "admin" ? true : false
  const isAmbassador = JSON.parse(localStorage.getItem("user")).role === "ambassador" ? true : false
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/ambassador" element={isAdmin ? <AmbassadorList /> : <Dashboard />} />
      <Route path="/ambassador-requests" element={isAdmin ? <AmbassadorReq /> : <Dashboard />} />
      <Route path="/emergencies" element={<EmergencyList />} />
      <Route path="/fund-requests" element={isAdmin || isAmbassador ? <FundReqListByCampus /> : <Dashboard />} />
      <Route path="/my-ambassador" element={<MyAmbassador />} />
      <Route path="/campuses" element={isAdmin ? <CampusList /> : <Dashboard />} />
      <Route path="/users" element={isAdmin ? <UserList /> : <Dashboard />} />
    </Routes>
  )
}

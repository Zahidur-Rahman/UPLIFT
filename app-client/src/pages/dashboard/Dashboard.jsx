import React from "react"
import { Chart, registerables } from "chart.js"
import { Bar } from "react-chartjs-2"
import { LocalStorage } from "../../utils"
import AdminDashboard from "../../components/dashboard/AdminDashboard"
import UserDashboard from "../../components/dashboard/UserDashboard"
const user = LocalStorage.get("user")

Chart.register(...registerables)

export default function Dashboard() {
  return <div>{user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}</div>
}

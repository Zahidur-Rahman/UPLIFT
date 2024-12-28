import React from "react"
import Sidebar from "../components/dashboard/Sidebar"
import Topbar from "../components/dashboard/Topbar"

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex" id="wrapper">
      {/* sidebar */}
      <Sidebar />
      {/* <!-- Page content wrapper--> */}
      <div id="page-content-wrapper">
        {/* <!-- Top navigation--> */}
        <Topbar />
        {/* <!-- Page content--> */}
        <div className="container-fluid p-4">{children}</div>
      </div>
    </div>
  )
}

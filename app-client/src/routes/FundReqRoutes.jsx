import React from "react"
import { Route, Routes } from "react-router-dom"
import AllFundReq from "../pages/fund_req/AllFundReq"
import CreateFundReq from "../pages/fund_req/CreateFundReq"
import Login from "../pages/login/Login"
import { LocalStorage } from "../utils"
import ViewReq from "../pages/fund_req/ViewReq"
import Emergencies from "../components/home/Emergency"
import Layout from "../layouts/Layout"

export default function FundReqRoutes() {
  const isAuthenticated = LocalStorage.get("user") ? true : false
  return (
    <Routes>
      <Route path="/all" element={<AllFundReq />} />
      <Route
        path="/emergencies"
        element={
          <Layout>
            <Emergencies />
          </Layout>
        }
      />
      <Route path="/create" element={isAuthenticated ? <CreateFundReq /> : <Login />} />
      <Route path="/view/:id" element={<ViewReq />} />
    </Routes>
  )
}

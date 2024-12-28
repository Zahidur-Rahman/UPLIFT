import React from "react"
import { Route, Routes } from "react-router-dom"
import About from "../components/home/Story"
import Contact from "../components/home/Contact"
import Ambassador from "../components/home/Ambassador"
import Home from "../pages/Home"
import Layout from "../layouts/Layout"

export default function BasicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/ambassador"
        element={
          <Layout>
            <Ambassador />
          </Layout>
        }
      />
    </Routes>
  )
}

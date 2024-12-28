import React from "react"
import Layout from "../layouts/Layout"
import Hero from "../components/home/Hero"
import Padding from "../components/home/Greeting"
import Story from "../components/home/Story"
import CTA from "../components/home/CTA"
import Emergency from "../components/home/Emergency"
import Testimonial from "../components/home/Testimonial"
import Contact from "../components/home/Contact"
import Ambassador from "../components/home/Ambassador"

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Padding />
      <Story />
      <CTA />
      <Emergency />
      <Ambassador />
      <Testimonial />
      <Contact />
    </Layout>
  )
}

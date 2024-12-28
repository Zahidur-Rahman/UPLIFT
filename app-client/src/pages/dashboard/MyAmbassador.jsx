import React from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import UserCard from "../../components/dashboard/UserCard"
import AmbassadorDetails from "../../components/dashboard/AmbassadorDetails"
import IMGMHAMUDA from "../../../public/images/avatar/mhamuda.jpeg"

export default function MyAmbassador() {
  const user = {
    image: IMGMHAMUDA,
    name: "Mst. Mhamuda Khatun",
    phone: "+8801910828297",
    email: "mhamudarj05@gmail.com",
    university: "University of Rajshahi",
    department: "Computer Science & Engineering",
    socialMedia: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  }
  const details = {
    name: "Mst. Mhamuda Khatun",
    description: "Mhamuda is a passionate computer science student with a love for technology, AI, and software development. He is highly involved in various extracurricular activities and is known for his leadership qualities.",
    // achievements: ["Led a team of 5 to win the National Hackathon 2023", "Developed an open-source project with 1K+ stars on GitHub", "Published 3 research papers in AI and machine learning"],
    additionalInfo: "Mhamuda enjoys coding in Python, JavaScript, and C++. He is also an ambassador for various tech programs and loves mentoring junior students.",
  }
  return (
    <DashboardLayout>
      <div className="container mt-5">
        <h1 className="text-center mb-4 color-custom-green">Ambassador Profile</h1>
        <div className="row">
          {/* Left Side: User Card */}
          <div className="col-md-4">
            <UserCard user={user} />
          </div>

          {/* Right Side: More Details */}
          <div className="col-md-8">
            <AmbassadorDetails details={details} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

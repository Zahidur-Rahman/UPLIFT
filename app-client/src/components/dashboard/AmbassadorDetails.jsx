import React from "react"

export default function AmbassadorDetails({ details }) {
  return (
    <div className="card mb-4 shadow-sm" style={{ borderColor: "#5abfab" }}>
      <div className="card-body">
        <h5 className="card-title" style={{ color: "#5abfab" }}>
          About {details.name}
        </h5>
        <p>{details.description}</p>
        {/* <h6 className="mt-4" style={{ color: "#5abfab" }}>
          Achievements
        </h6>
        <ul>
          {details.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul> */}
        <h6 className="mt-4" style={{ color: "#5abfab" }}>
          Additional Info
        </h6>
        <p>{details.additionalInfo}</p>
      </div>
    </div>
  )
}

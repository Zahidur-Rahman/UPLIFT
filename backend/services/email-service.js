const nodemailer = require("nodemailer")
const config = require("../config")
const path = require("path")
const fs = require("fs")

const transport = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  auth: {
    user: config.EMAIL_USERNAME,
    pass: config.EMAIL_PASSWORD,
  },
})

// Function to send email with embedded images
async function sendVerificationEmail(email, user, imagePaths) {
  try {
    const imageTags = imagePaths.map((imagePath) => {
      // Ensure imagePath is an absolute path
      const absoluteImagePath = path.join(__dirname, "../", imagePath)
      const filename = path.basename(imagePath)
      const imageContent = fs.readFileSync(absoluteImagePath, { encoding: "base64" })
      const imageSrc = `data:image/jpeg;base64,${imageContent}` // Adjust according to image type

      return `<img src="${imageSrc}" alt="${filename}" style="max-width: 100%;" />`
    })

    const emailContent = `
    <p>Hello sir,</p>
    <p>My name is ${user.name}.I have requested a fund for my medical needs in Uplift.</p>
    <p>Please find below your details:</p>
    <ul>
      <li><strong>Name:</strong> ${user.name}</li>
      <li><strong>Department:</strong> ${user.department_name}</li>
      <li><strong>Campus:</strong> ${user.campus_name}</li>
      <li><strong>Reason:</strong> ${user.fundreq.disease}</li>
      <li><strong>Description:</strong> ${user.fundreq.description}</li>
      <li><strong>Goal Amount:</strong> ${user.fundreq.goal_amount}</li>
    </ul>
    <p>Click the buttons below to verify or cancel the request.</p>
 
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding: 10px; background-color: #4CAF50;">
          <a href="${config.BASE_URL}/fundreq/verify/${user.fundreq._id}" target="_blank" style="text-decoration: none; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block;">Verify Request</a>
        </td>
        <td style="padding: 10px; background-color: #f44336;">
          <a href="${config.BASE_URL}/fundreq/cancel/${user.fundreq._id}" style="text-decoration: none; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block;">Cancel Request</a>
        </td>
      </tr>
    </table>
    <hr />
    ${imageTags.join("<br />")}
    `

    // Send email with embedded images
    await transport.sendMail({
      from: config.EMAIL_FROM,
      to: email,
      subject: "Fund Request Verification",
      html: emailContent,
    })

    console.log("Email sent with embedded images")
  } catch (error) {
    console.error("Error sending email:", error)
  }
}

module.exports = {
  sendVerificationEmail,
}

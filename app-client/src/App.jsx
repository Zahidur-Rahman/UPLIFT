import { BrowserRouter } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import Router from "./routes"
import "./App.css"

function App() {
  setTimeout(() => {
    // Parse query parameters from URL
    const urlParams = new URLSearchParams(window.location.search)
    const status = urlParams.get("status")
    const message = urlParams.get("message")

    // Display message to the user based on status
    if (status === "success") {
      //show alert just once
      toast.success(message)
      window.location.href = "/"
    } else if (status === "error") {
      toast.error(message)
    }
  }, 1000)

  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

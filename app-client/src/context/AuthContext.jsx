import { createContext, useContext, useEffect, useReducer } from "react"
import { loginUser, registerUser, logoutUser } from "../services/apiAuth"
import { useNavigate } from "react-router-dom"
import { LocalStorage } from "../utils"
const AuthContext = createContext()
const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      }

    default:
      return state
  }
}
// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()
  useEffect(() => {
    const user = LocalStorage.get("user")
    const token = LocalStorage.get("token")
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: { user: user, token },
      })
    }
  }, [])
  async function login(email, password) {
    const data = await loginUser(email, password)

    const user = {
      username: data.user.name,
      email: data.user.email,
      role: data.user.role,
      phone: data.user.phone,
      department: data.user.department,
      campus: data.user.campus,
      avatar: data.user.avatar,
    }
    const token = data.token
    LocalStorage.set("user", user)
    LocalStorage.set("token", token)
    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
        token: token,
      },
    })
    navigate("/dashboard")
  }

  async function register(values) {
    const data = await registerUser(values)

    const user = {
      username: data.user.name,
      email: data.user.email,
      role: data.user.role,
      phone: data.user.phone,
      department: data.user.department,
      campus: data.user.campus,
      avatar: data.user.avatar,
      isAmbassadorReq: data.user.isAmbassadorReq,
    }
    const token = data.token
    LocalStorage.set("user", user)
    LocalStorage.set("token", token)

    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
        token: token,
      },
    })
  }

  async function handleLogout(e) {
    e.preventDefault()
    await logoutUser(token)
    LocalStorage.clear()
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }
  return <AuthContext.Provider value={{ user, isAuthenticated, token, login, handleLogout, register }}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth }

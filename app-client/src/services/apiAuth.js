import toast from "react-hot-toast"

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const response = await res.json()
    // console.log("USER", token)
    if (res.ok) {
      return response
    }
    throw new Error(response.message)
  } catch (err) {
    throw new Error(err)
  }
}

export async function logoutUser(token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    if (res.ok) {
      toast.success(data.message)
      return data
    }
    toast.error(data.message)
    throw new Error(data.message)
  } catch (err) {
    throw new Error(err)
    toast.error(err.message)
  }
}

export async function registerUser(values) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    const response = await res.json()

    if (res.ok) {
      return response
    }
    throw new Error(response.message)
  } catch (err) {
    throw new Error(err)
  }
}

const getMe = async (token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/users/my-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    if (res.ok) {
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
        photo: data.avatar,
        token,
      }
      return userData
    }
    throw new Error(data.message)
  } catch (err) {
    throw new Error(err)
  }
}

export async function getAllUsers(token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/auth/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    if (res.ok) {
      return data
    }
    throw new Error(data.message)
  } catch (err) {
    throw new Error(err)
  }
}

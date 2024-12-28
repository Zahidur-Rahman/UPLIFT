import { LocalStorage } from "../utils"

export async function getAdminReport() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/report/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorage.get("token")}`,
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

export async function getUserReport() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/report/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorage.get("token")}`,
      },
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data)
      return data
    }
    throw new Error(data.message)
  } catch (err) {
    throw new Error(err)
  }
}

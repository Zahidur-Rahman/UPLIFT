import { LocalStorage } from "../utils"

export async function getAmbassadors() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/dashboard/ambassador`, {
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

export async function getAmbassadorRequests() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/dashboard/ambassador-requests`, {
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

export async function acceptAmbassador(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/dashboard/approve-ambassador/${id}`, {
      method: "POST",
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

export async function rejectAmbassador(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/dashboard/reject-ambassador/${id}`, {
      method: "POST",
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

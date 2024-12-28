import toast from "react-hot-toast"
import { LocalStorage } from "../utils"

export async function createFundReq(values) {
  try {
    const formData = new FormData()

    // Append non-file fields to FormData
    formData.append("goal_amount", values.goal_amount)
    formData.append("disease", values.disease)
    formData.append("description", values.description)
    formData.append("valid_until", values.valid_until)

    // Append files from FileList to FormData
    for (let i = 0; i < values.medical_records.length; i++) {
      formData.append("medical_records", values.medical_records[i])
    }

    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LocalStorage.get("token")}`,
      },
      body: formData,
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

export async function getEmergencyFundReq() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/emergency`, {
      method: "GET",
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

export async function getAllEmergencyFundReqsByCampus(campus) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/emergency/all/${campus}`, {
      method: "GET",
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

export async function makeDonation(values) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/donate`, {
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

export async function donationSuccess(transaction_id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/donate/success/${transaction_id}`, {
      method: "GET",
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

export async function getAllFundReq() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/all`, {
      method: "GET",
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

export async function getFundReqById(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/${id}`, {
      method: "GET",
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

export async function addComment(id, values) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/add-comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorage.get("token")}`,
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

export async function getComments(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/get-comments/${id}`, {
      method: "GET",
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

export async function getTotalDonations() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/donate/total`, {
      method: "GET",
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

export async function getAllFundReqByCampus(campus) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/all/${campus}`, {
      method: "GET",
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

export async function makeEmergency(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/fundreq/make-emergency/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorage.get("token")}`,
      },
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

export async function getAllCampuses() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/campus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function getAllDepartments() {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/campus/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function getDepartmentsByCampusId(campusId) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/campus/${campusId}/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function getCampusById(campusId) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/campus/${campusId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function createCampus(campusData) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/campus/create`, {
      method: "POST",
      body: campusData, // No need for headers with FormData
    })

    const data = await res.json()
    if (res.ok) {
      return data
    }
    throw new Error(data.message)
  } catch (err) {
    throw new Error(err.message || "Error creating campus")
  }
}

export async function createDepartment(departmentData) {
  try {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/campus/department/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departmentData),
    })

    const data = await res.json()
    if (res.ok) {
      return data
    }
    throw new Error(data.message)
  } catch (err) {
    throw new Error(err.message || "Error creating department")
  }
}

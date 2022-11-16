const body = {
  user: process.env.AUTH_USERNAME,
  password: process.env.AUTH_PASSWORD,
}

const TOKEN_ENDPOINT = process.env.AUTH_URL as string
const API_URL = process.env.API_URL as string

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return response.json()
}

export const getAllTasks = async () => {
  const { token } = await getAccessToken()

  return fetch(`${API_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

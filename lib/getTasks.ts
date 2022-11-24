import { getAccessToken } from './authRequest'

const API_URL = process.env.API_URL as string

// Request naar de taken end point doen
const fetchAllTasks = async (props: string) => {
  const { token } = await getAccessToken(props)

  console.log('Fetch naar api/tasks endpoint')

  return fetch(`${API_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getTasks = async (props: string): Promise<void> => {
  const response = await fetchAllTasks(props)
  const tasks = await response.json()

  console.log('Alle taken API call')

  return tasks
}

export default getTasks

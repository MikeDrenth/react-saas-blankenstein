import { getAccessToken } from './authRequest'

const API_URL = process.env.API_URL as string

// Request naar de taken end point doen
const fetchAllSites = async (site: string) => {
  const { token } = await getAccessToken(site)

  return fetch(`${API_URL}/api/sites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Request naar de taken end point doen
const fetchSite = async (site: string) => {
  const { token } = await getAccessToken(site)

  return fetch(`${API_URL}/api/sites/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getSiteInfo = async (site: string): Promise<void> => {
  const response = await fetchAllSites(site)
  const siteInfo = await response.json()

  return siteInfo
}

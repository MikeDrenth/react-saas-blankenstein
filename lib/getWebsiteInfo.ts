import { getAccessToken } from './authRequest'

const API_URL = process.env.API_URL as string

// Fetch naar alle websites doen
const fetchAllSites = async (site: string) => {
  const { token } = await getAccessToken(site)

  return fetch(`${API_URL}/api/sites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Bijbehoorende website ophalen
const fetchSite = async (site: string) => {
  const { token } = await getAccessToken(site)

  const SITE = `${site}_DOMAIN`
  const DOMAIN = process.env[SITE]
  return fetch(`${API_URL}/api/sites?filter[domains.domain_name]=${DOMAIN}`, {
    next: {
      revalidate: 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getSiteInfo = async (site: string): Promise<void> => {
  const response = await fetchSite(site)
  const { data } = await response.json()

  return data
}

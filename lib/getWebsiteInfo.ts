import { getAccessToken } from './authRequest'
const API_URL = process.env.API_URL as string

// Fetch naar alle websites doen
const fetchAllSites = async (site: string) => {
  const { token } = await getAccessToken(site)
  if (!token) throw new Error('Geen geldige token opgegeven.')
  try {
    return fetch(`${API_URL}sites`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'private max-age=900 immutable',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

// Aan de hand van domain een website ophalen
export const fetchSite = async (site: string) => {
  const { token } = await getAccessToken(site)
  if (!token) throw new Error('Geen geldige token opgegeven.')

  const SITE = `${site}_DOMAIN`
  const DOMAIN = process.env[SITE]
  try {
    return fetch(`${API_URL}sites?filter[domains.domain_name]=${DOMAIN}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'private max-age=900 immutable',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

// Alle pagina's ophalen aan de hand van site ID
export const fetchPages = async (site: string, siteId: number) => {
  const { token } = await getAccessToken(site)
  if (!token) throw new Error('Geen geldige token opgegeven.')

  try {
    return fetch(
      `${API_URL}sites/${siteId}/pages?filter[language_id]=1&filter[parent_id]=0&filter[page_hidden_menu]=nee&include=children`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'private max-age=900 immutable',
        },
      }
    )
  } catch (error) {
    console.log(error)
  }
}

const fetchLayouts = async (site: string, siteId: number, pageId: number) => {
  try {
    const { token } = await getAccessToken(site)
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const response = await fetch(
      `${API_URL}sites/${siteId}/pages/${pageId}?include=layoutRows.columns.col`,
      {
        method: 'GET',
        headers: headers,
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

// Pagina info opzoeken aan de hand van pagina url
export const fetchPageInfo = async (
  site: string,
  siteId: number,
  pageUrl: string
) => {
  const { token } = await getAccessToken(site)
  if (!token) throw new Error('Geen geldige token opgegeven')
  try {
    return fetch(
      `${API_URL}sites/${siteId}/pages?filter[page_url]=${pageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'private max-age=900 immutable',
        },
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export const getPages = async (site: string, siteId: number): Promise<void> => {
  if (!site || !siteId) throw new Error('Geen geldige site of siteId opgegeven')
  const response = await fetchPages(site, siteId)
  const { data } = await response?.json()

  return data
}

export const getSiteInfo = async (site: string): Promise<void> => {
  if (!site) throw new Error('Geen geldige site opgegeven')
  const response = await fetchSite(site)
  const { data } = await response?.json()

  return data
}

export const getPageInfo = async (
  site: string,
  siteId: number,
  pageUrl: string
) => {
  if (!site || !siteId || !pageUrl)
    throw new Error('Geen geldige site, siteId of pageId opgegeven')
  const response = await fetchPageInfo(site, siteId, pageUrl)
  const { data } = await response?.json()

  return data
}

export const getLayouts = async (
  site: string,
  siteId: number,
  pageId: number
) => {
  if (!site || !siteId || !pageId)
    throw new Error('Geen geldige site, siteId of pageId opgegeven')
  const layouts = await fetchLayouts(site, siteId, pageId)

  return layouts
}

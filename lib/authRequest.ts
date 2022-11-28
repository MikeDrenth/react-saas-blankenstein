const TOKEN_ENDPOINT = process.env.AUTH_URL as string

// Request doen om een bearer token aan te maken voor de api requests
export const getAccessToken = async (site: string) => {
  if (!site) return

  // Dynamisch de env variable ophalen adhv meegeven site
  const AUTH_USER = `${site}_AUTH_USERNAME`
  const AUTH_PASSWORD = `${site}_AUTH_PASSWORD`
  const body = {
    user: process.env[AUTH_USER],
    password: process.env[AUTH_PASSWORD],
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response.json()
}

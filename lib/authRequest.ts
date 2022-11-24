const TOKEN_ENDPOINT = process.env.AUTH_URL as string

// Request doen om een bearer token aan te maken voor de api requests
export const getAccessToken = async (props: any) => {
  const body = {
    user: `process.env.${props}_AUTH_USERNAME`,
    password: `process.env.${props}_AUTH_PASSWORD`,
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

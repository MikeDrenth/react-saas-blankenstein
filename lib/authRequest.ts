const TOKEN_ENDPOINT = process.env.AUTH_URL as string;

// Request doen om een bearer token aan te maken voor de api requests
export const getAccessToken = async (site: string) => {
  if (!site) throw new Error("Geen geldige website opgegeven.");

  // De juiste user info ophalen in lokaal env bestand
  const AUTH_USER = `${site}_AUTH_USERNAME`;
  const AUTH_PASSWORD = `${site}_AUTH_PASSWORD`;
  const body = {
    user: process.env[AUTH_USER],
    password: process.env[AUTH_PASSWORD],
  };
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public max-age=86400 immutable",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

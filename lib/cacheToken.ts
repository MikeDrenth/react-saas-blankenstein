import NodeCache from "node-cache";

const TOKEN_ENDPOINT = process.env.AUTH_URL as string;
const cache = new NodeCache({ stdTTL: 60 * 60 }); // cache opgeslagen voor 1 uur

// Request doen om een bearer token aan te maken voor de api requests
export const getAccessToken = async (site: string) => {
  if (!site) throw new Error("Geen geldige website opgegeven.");

  // Check if the token is in cache
  const cachedToken = cache.get(site);
  if (cachedToken) {
    return cachedToken;
  }

  // De juiste user info ophalen in lokaal env bestand
  const ENV_SITE = site?.replace(/-/g, "");
  const AUTH_USER = `${ENV_SITE}_AUTH_USERNAME`;
  const AUTH_PASSWORD = `${ENV_SITE}_AUTH_PASSWORD`;
  const body = {
    user: process.env[AUTH_USER],
    password: process.env[AUTH_PASSWORD],
  };

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public max-age=86400 immutable",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const data = await response.json();
    cache.set(site, data.token); // cache the token
    return data.token;
  } else {
    console.log("Error:", response.statusText);
  }
};

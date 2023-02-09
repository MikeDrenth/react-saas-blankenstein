import { rejects } from "assert";

const TOKEN_ENDPOINT = process.env.AUTH_URL as string;

// Request doen om een bearer token aan te maken voor de api requests
export const getAccessToken = async (site: string) => {
  if (!site) throw new Error("Geen geldige website opgegeven.");

  // De juiste user info ophalen in lokaal env bestand
  const ENV_SITE = site?.replace(/-/g, "");
  const AUTH_USER = `${ENV_SITE}_AUTH_USERNAME`;
  const AUTH_PASSWORD = `${ENV_SITE}_AUTH_PASSWORD`;
  const body = {
    user: process.env[AUTH_USER],
    password: process.env[AUTH_PASSWORD],
  };

  return await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((respone) => {
      if (respone.ok) {
        return respone.json();
      }
    })
    .catch((error) => console.log("Error:", error));
};

import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_ENDPOINT = process.env.AUTH_URL as string;
const getAuthToken = async (req: NextApiRequest): Promise<void> => {
  const env = process.env.NODE_ENV;
  let AUTH_USER;
  let AUTH_PASSWORD;
  const hostname = req.headers.host; // Huidige host ophalen
  const currentHost: string | undefined = // Host strippen zodat we de site naam krijgen voor auth
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname?.replace(`.vercel.app`, "")
      : hostname?.replace(`.localhost:3000`, "");

  if (env === "production") {
    const ENV_SITE = currentHost?.replaceAll("-", "");
    AUTH_USER = `${ENV_SITE}_AUTH_USERNAME`;
    AUTH_PASSWORD = `${ENV_SITE}_AUTH_PASSWORD`;
  } else {
    AUTH_USER = `blankensteinaanzee_AUTH_USERNAME`;
    AUTH_PASSWORD = `blankensteinaanzee_AUTH_PASSWORD`;
  }

  const body: { user: string; password: string } = {
    user: process.env[AUTH_USER] as string,
    password: process.env[AUTH_PASSWORD] as string,
  };

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data.token, "getAccessToken");
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

export default getAuthToken;

import { cacheAccessToken } from "./authRequest";
const API_URL = process.env.API_URL as string;

interface AccessToken {
  token: string;
}

let accessToken: string | null = null;
let accessTokenExpires: number | null = null;

const getAccessTokenAndCache = async (site: string) => {
  const { token, expires_at } = await cacheAccessToken(site);

  console.log(token, "asdjkdfgjhdfjkg jkhsdf");
  if (!token) {
    throw new Error("accessToken: Aanmaken van een token is fout gegaan.");
  }

  accessToken = token;
  accessTokenExpires = expires_at;
};

const hasAccessTokenExpired = () => {
  if (accessToken && accessTokenExpires) {
    const expirationTime = new Date(accessTokenExpires).getTime();
    const currentTime = Date.now();
    console.log(currentTime, expirationTime);
    return currentTime >= expirationTime;
  }
  return true;
};

// // Aan de hand van domain een website ophalen
export const fetchSite = async (site: string) => {
  if (!accessToken || hasAccessTokenExpired()) {
    await getAccessTokenAndCache(site);
  }

  const ENV_SITE = site?.replace(/-/g, "");
  const SITE = `${ENV_SITE}_DOMAIN`;
  const DOMAIN = process.env[SITE];

  try {
    return fetch(`${API_URL}/sites?filter[domains.domain_name]=${DOMAIN}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Cache-Control": "public max-age=900 immutable",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Alle pagina's ophalen aan de hand van site ID
export const fetchPages = async (site: string) => {
  if (!accessToken || hasAccessTokenExpired()) {
    await getAccessTokenAndCache(site);
  }

  const ENV_SITE = site?.replace(/-/g, "");
  const SITE = `${ENV_SITE}_DOMAIN`;
  const DOMAIN = process.env[SITE];

  try {
    return fetch(
      `${API_URL}/pages?filter[domain]=${DOMAIN}&filter[language_id]=1&filter[parent_id]=0&filter[page_hidden_menu]=nee&include=children`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "private max-age=900 immutable",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getPages = async (site: string) => {
  if (!site) throw new Error("getPages: Geen geldige site of siteId opgegeven");
  const response = await fetchPages(site);
  const { data } = await response?.json();

  return data;
};

export const getSiteInfo = async (site: string) => {
  if (!site) throw new Error("getSiteInfo: Geen geldige site opgegeven");
  const response = await fetchSite(site);
  const { data } = await response?.json();

  return data;
};

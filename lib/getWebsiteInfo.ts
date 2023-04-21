import { cacheAccessToken } from "./authRequest";
const API_URL = process.env.API_URL as string;

let accessToken: string | null = null;
let accessTokenExpires: number | null = null;

const getAccessTokenAndCache = async (site: string) => {
  // const { token, expires_at } = await cacheAccessToken(site);
  const token = await cacheAccessToken(site);

  if (!token) {
    throw new Error("accessToken: Aanmaken van een token is fout gegaan.");
  }
  accessToken = token as string;
  accessTokenExpires = "" as unknown as number;
};

const hasAccessTokenExpired = () => {
  if (accessToken && accessTokenExpires) {
    const expirationTime = new Date(accessTokenExpires).getTime();
    const currentTime = Date.now();
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

// Pagina info opzoeken aan de hand van pagina url
export const fetchPageInfo = async (site: string, pageUrl: string) => {
  if (!accessToken || hasAccessTokenExpired()) {
    await getAccessTokenAndCache(site);
  }
  const ENV_SITE = site?.replace(/-/g, "");
  const SITE = `${ENV_SITE}_DOMAIN`;
  const DOMAIN = process.env[SITE];

  try {
    return fetch(
      `${API_URL}/pages?filter[domain]=${DOMAIN}&filter[page_url]=${pageUrl}`,
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

const fetchLayouts = async (site: string, pageUrl: string) => {
  if (!accessToken || hasAccessTokenExpired()) {
    await getAccessTokenAndCache(site);
  }
  const ENV_SITE = site?.replace(/-/g, "");
  const SITE = `${ENV_SITE}_DOMAIN`;
  const DOMAIN = process.env[SITE];

  try {
    return fetch(
      `${API_URL}/pages?filter[domain]=${DOMAIN}&filter[page_url]=${pageUrl}&include=layoutRows.columns.component`,
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

export const getPageInfo = async (site: string, pageUrl: string) => {
  if (!site || !pageUrl)
    throw new Error(
      "getPageInfo: Geen geldige site, siteId of pageId opgegeven"
    );
  const response = await fetchPageInfo(site, pageUrl);
  const { data } = await response?.json();

  return data;
};

export const getPages = async (site: string) => {
  if (!site) throw new Error("getPages: Geen geldige site");
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

export const getLayoutRows = async (site: string, pageUrl: string) => {
  if (!site || !pageUrl)
    throw new Error("getLayoutRows: Geen geldige site of pageUrl opgegeven.");
  const response = await fetchLayouts(site, pageUrl);
  const { data } = await response?.json();

  return data;
};

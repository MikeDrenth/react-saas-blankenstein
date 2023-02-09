import { getAccessToken } from "./authRequest";
const API_URL = process.env.API_URL as string;

// // Aan de hand van domain een website ophalen
export const fetchSite = async (site: string) => {
  const { token } = await getAccessToken(site);
  if (!token) throw new Error("Geen geldige token opgegeven.");

  const ENV_SITE = site?.replace(/-/g, "");
  const SITE = `${ENV_SITE}_DOMAIN`;
  const DOMAIN = process.env[SITE];

  try {
    return fetch(`${API_URL}/sites?filter[domains.domain_name]=${DOMAIN}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "public max-age=900 immutable",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Alle pagina's ophalen aan de hand van site ID
export const fetchPages = async (site: string, token: string) => {
  // const { token } = await getAccessToken(site);
  if (!token) throw new Error("Geen geldige token opgegeven.");

  const ENV_SITE = site?.replace(/-/g, "");
  const SITE = `${ENV_SITE}_DOMAIN`;
  const DOMAIN = process.env[SITE];

  try {
    return fetch(
      `${API_URL}/pages?filter[domain]=${DOMAIN}&filter[language_id]=1&filter[parent_id]=0&filter[page_hidden_menu]=nee&include=children`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
  const { token } = await getAccessToken(site);
  if (!token) throw new Error("Geen geldige token opgegeven");

  const ENV_SITE = site?.replace(/-/g, "");
  const SITE = `${ENV_SITE}_DOMAIN`;
  const DOMAIN = process.env[SITE];

  try {
    return fetch(
      `${API_URL}/pages?filter[domain]=${DOMAIN}&filter[page_url]=${pageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "private max-age=900 immutable",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const fetchLayouts = async (site: string, pageUrl: string) => {
  try {
    const { token } = await getAccessToken(site);
    const ENV_SITE = site?.replace(/-/g, "");
    const SITE = `${ENV_SITE}_DOMAIN`;
    const DOMAIN = process.env[SITE];
    const response = await fetch(
      `${API_URL}/pages?filter[domain]=${DOMAIN}&filter[page_url]=${pageUrl}&include=layoutRows.columns.col`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "private max-age=900 immutable",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPages = async (site: string, token: string) => {
  if (!site) throw new Error("Geen geldige site of siteId opgegeven");
  const response = await fetchPages(site, token);
  const { data } = await response?.json();

  return data;
};

export const getSiteInfo = async (site: string) => {
  if (!site) throw new Error("Geen geldige site opgegeven");
  const response = await fetchSite(site);
  const { data } = await response?.json();

  return data;
};

export const getPageInfo = async (site: string, pageUrl: string) => {
  if (!site || !pageUrl)
    throw new Error("Geen geldige site, siteId of pageId opgegeven");
  const response = await fetchPageInfo(site, pageUrl);
  const { data } = await response?.json();

  return data;
};

export const getLayouts = async (site: string, pageUrl: string) => {
  if (!site || !pageUrl)
    throw new Error("Geen geldige site, siteId of pageId opgegeven");
  const layouts = await fetchLayouts(site, pageUrl);

  return layouts;
};

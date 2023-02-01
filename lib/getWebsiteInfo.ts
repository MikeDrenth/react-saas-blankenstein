import { getAccessToken } from "./authRequest";
const API_URL = process.env.API_URL as string;

// // Fetch naar alle websites doen
// const fetchAllSites = async (site: string) => {
//   const { token } = await getAccessToken(site)
//   if (!token) throw new Error('Geen geldige token opgegeven.')
//   try {
//     return fetch(`${API_URL}sites`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Cache-Control': 'private max-age=900 immutable',
//       },
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

// // Aan de hand van domain een website ophalen
export const fetchSite = async (site: string) => {
  const { token } = await getAccessToken(site);
  if (!token) throw new Error("Geen geldige token opgegeven.");

  const SITE = `${site}_DOMAIN`;
  const DOMAIN = process.env[SITE];
  console.log(DOMAIN);
  try {
    return fetch(`${API_URL}/sites?filter[domains.domain_name]=${DOMAIN}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "private max-age=900 immutable",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Alle pagina's ophalen aan de hand van site ID
export const fetchPages = async (site: string) => {
  const { token } = await getAccessToken(site);
  if (!token) throw new Error("Geen geldige token opgegeven.");

  const SITE = `${site}_DOMAIN`;
  const DOMAIN = process.env[SITE];

  try {
    // return fetch(
    //   `${API_URL}sites/${siteId}/pages?filter[language_id]=1&filter[parent_id]=0&filter[page_hidden_menu]=nee&include=children`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Cache-Control": "private max-age=900 immutable",
    //     },
    //   }
    // );
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

// const fetchLayouts = async (site: string, siteId: number, pageId: number) => {
//   try {
//     const { token } = await getAccessToken(site);
//     const response = await fetch(
//       `${API_URL}sites/${siteId}/pages/${pageId}?include=layoutRows.columns.col`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Cache-Control": "private max-age=900 immutable",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

const fetchLayouts = async (site: string, siteId: number, pageId: number) => {
  const { token } = await getAccessToken(site);
  const response = await fetch(
    `${API_URL}/sites/${siteId}/pages/${pageId}?include=layoutRows.columns.col`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "private max-age=900 immutable",
      },
    }
  );

  const { data, errors } = await response.json();

  if (response.ok) {
    // Layouts terug sturen

    return;
  } else {
    // error terug geven
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getPages = async (site: string): Promise<void> => {
  if (!site) throw new Error("Geen geldige site of siteId opgegeven");
  const response = await fetchPages(site);
  const { data } = await response?.json();

  return data;
};

export const getSiteInfo = async (site: string): Promise<void> => {
  if (!site) throw new Error("Geen geldige site opgegeven");
  const response = await fetchSite(site);
  const { data } = await response?.json();

  return data;
};

export const getLayouts = async (
  site: string,
  siteId: number,
  pageId: number
) => {
  if (!site || !siteId || !pageId)
    throw new Error("Geen geldige site, siteId of pageId opgegeven");
  const layouts = await fetchLayouts(site, siteId, pageId);

  return layouts;
};

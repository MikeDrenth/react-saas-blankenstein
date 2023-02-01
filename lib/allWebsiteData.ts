import { websiteData } from "websiteData";

// Request doen om een bearer token aan te maken voor de api requests
export const allWebsiteData = () => {
  const paths = websiteData.map((comment) => {
    return {
      params: {
        site: comment.site as string,
        local: comment.local as string,
        live: comment.live as string,
      },
    };
  });

  return paths;
};

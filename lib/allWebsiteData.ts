import { websiteData } from 'websiteData'

// Request doen om een bearer token aan te maken voor de api requests
export const allWebsiteData = async () => {
  const paths = websiteData.map((comment) => {
    return {
      params: {
        site: comment.site,
        local: comment.local,
        live: comment.live,
      },
    }
  })

  return paths
}

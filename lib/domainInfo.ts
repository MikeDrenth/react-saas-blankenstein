import { websiteData } from '../websiteData'

export const domainInfo = (props: string) => {
  const data = websiteData.map((domain) => {
    if (domain.name === props) {
      const domainInfo = {
        localhost: domain.local,
        live: domain.live,
      }
      return domainInfo
    }
  })

  return data
}

import { useRouter } from 'next/router'
import Layout from '@/components/sites/Layout'

interface PathProps extends ParsedUrlQuery {
  site: string
  slug: string
}

interface PostProps {
  stringifiedData: string
  stringifiedPages: string
}

export default function Post({ stringifiedPages, stringifiedData }: PostProps) {
  const router = useRouter()
  if (router.isFallback) return <Loader />

  if (!stringifiedData) return

  const data = JSON.parse(stringifiedData)
  const pages = JSON.parse(stringifiedPages)
  const info = data[0]

  console.log(data, 'data')

  const meta = {
    title: info.site_name,
    description: `Welkom bij ${info.description}`,
    logo: '/logo.png',
    ogImage: 'logotje',
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: info.site_name,
    pageTitle: info.page_title,
    pages: pages,
  } as Meta

  return <Layout meta={meta}></Layout>
}

import { allWebsiteData } from '@/lib/allWebsiteData'
import { getSiteInfo, getPages, getPageInfo } from '@/lib/getWebsiteInfo'

// export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
//   const currenthost = req.headers.host
//   console.log(currenthost)
//   const response = await fetch(`http://localhost/api/tasks`)
//   const { tasks } = await response.json()

//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=900, stale-while-revalidate=899'
//   )

//   return {
//     // props: { tasks },
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  const data = allWebsiteData()

  const pages = async () => {
    const allPages = data.map(async ({ params }) => {
      const site = params.site
      const siteInfo = await getSiteInfo(site as string)
      if (typeof siteInfo === typeof undefined) return
      const siteId = siteInfo[0].site_id
      const pages = await getPages(site, siteId)
      return pages.map((pages) => ({
        params: { site: 'appelsap', slug: pages.page_url, id: siteId },
      }))
    })

    return await Promise.all(allPages)
  }

  const paths = await pages()

  return {
    paths: paths[0],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<PostProps, PathProps> = async ({
  params,
}) => {
  if (!params) throw new Error('No path parameters found')
  const { site, slug } = params
  console.log(params, 'sdfsdfsdfsdfsdfsdfsdfsdf')

  const siteInfo = await getSiteInfo(site as string)
  const siteId = siteInfo[0].site_id

  const data = await getPageInfo(site, siteId, slug)
  const pages = await getPages(site, siteId)

  return {
    props: {
      stringifiedData: JSON.stringify(data),
      stringifiedPages: JSON.stringify(pages),
    },
  }
}

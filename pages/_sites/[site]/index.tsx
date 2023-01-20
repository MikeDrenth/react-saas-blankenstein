import Layout from '@/components/sites/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { _SiteData, Meta } from '@/types'
import { getSiteInfo, getPages } from '@/lib/getWebsiteInfo'

interface PathProps {
  site: string
}

interface IndexProps {
  stringifiedData: string
  stringifiedPages: string
}

export default function Index({
  stringifiedData,
  stringifiedPages,
}: IndexProps) {
  const router = useRouter()
  if (router.isFallback) return <div>Loader</div>
  if (!stringifiedData) return

  const data = JSON.parse(stringifiedData)
  const pages = JSON.parse(stringifiedPages)
  const info = data[0]

  const meta = {
    title: info.site_name,
    description: `Welkom bij ${info.description}`,
    logo: '/logo.png',
    ogImage: 'logotje',
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: info.site_name,
    pages: pages,
  } as Meta

  return <Layout meta={meta}></Layout>
}

import { allWebsiteData } from '@/lib/allWebsiteData'

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await allWebsiteData()
  // const paths = [
  //   {
  //     params: {
  //       site: 'blankensteinaanzee.localhost:3000',
  //       local: 'blankensteinaanzee.localhost:3000',
  //       live: 'blankensteinaanzee.localhost:3000',
  //     },
  //   },
  //   {
  //     params: {
  //       site: 'uplandparcs.localhost:3000',
  //       local: 'uplandparcs.localhost:3000',
  //       live: 'uplandparcs.localhost:3000',
  //     },
  //   },
  // ]
  return {
    paths: data,
    fallback: 'blocking',
  }

  // const paths = data.comments.map((comment) => {
  //   return {
  //     params: {
  //       postId: comment.postId,
  //       commentId: comment.id
  //     }
  //   }
  // });

  // return {
  //   paths,
  //   fallback: false
  // }
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  params,
}) => {
  if (!params) throw new Error('No path parameters found')
  const { site } = params
  // const data = [
  //   { domain: 'uplandparcs', website: 'www.uplandparcs.nl' },
  //   { domain: 'westerbergen', website: 'www.uplandparcs.nl' },
  // ]

  // const project = data.find((p) => p.domain === site)

  // console.log(site, 'website')

  const data = await getSiteInfo(site as string)
  const siteId = data[0].site_id
  const pages = await getPages(site, siteId)

  // res.setHeader(
  //   'cache-control',
  //   'public s-max-age=900 stale-with-revalidate=899'
  // )
  return {
    props: {
      stringifiedData: JSON.stringify(data),
      stringifiedPages: JSON.stringify(pages),
    },
  }
}

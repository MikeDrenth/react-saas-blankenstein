import Layout from '@/components/sites/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { _SiteData, Meta } from '@/types'

interface PathProps {
  site: string
}

interface IndexProps {
  stringifiedData: string
}

export default function Index({ stringifiedData }: IndexProps) {
  const router = useRouter()
  if (router.isFallback) return <div>Loader</div>

  // const data = JSON.parse(stringifiedData) as _SiteData

  // const meta = {
  //   title: data.website,
  //   description: `Welkom bij ${data.website}`,
  //   logo: '/logo.png',
  //   ogImage: 'logotje',
  //   ogUrl: `https://westerbergen.vercel.pub`,
  //   subdomain: data.website,
  // } as Meta

  return <Layout>Dit is de website van</Layout>
}

import { getSiteInfo } from '@/lib/getWebsiteInfo'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { site: 'uplandparcs.localhost:3001' } }]

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  params,
  res,
  req,
}) => {
  if (!params) throw new Error('No path parameters found')

  // const { site: string } = params.site.site
  // const data = [
  //   { domain: 'uplandparcs', website: 'www.uplandparcs.nl' },
  //   { domain: 'westerbergen', website: 'www.uplandparcs.nl' },
  // ]

  // const project = data.find((p) => p.domain === site)
  // console.log(project, 'project')

  const respone = await getSiteInfo(params.site)
  const responseJson = await respone

  console.log(responseJson, 'index')

  res.setHeader(
    'cache-control',
    'public s-max-age=900 stale-with-revalidate=899'
  )

  return {
    props: {
      // stringifiedData: JSON.stringify(respone),
    },
  }
}

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
  if (!stringifiedData) return

  const data = JSON.parse(stringifiedData) as _SiteData

  const meta = {
    title: data[0].site_name,
    description: `Welkom bij ${data[0].site_name}`,
    logo: '/logo.png',
    ogImage: 'logotje',
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: data[0].site_name,
  } as Meta

  console.log(data[0].site_name)

  return <Layout>Dit is de website van {data[0].site_name} </Layout>
}

import { getSiteInfo } from '@/lib/getWebsiteInfo'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { site: 'uplandparcs.localhost:3000' } }]

  return {
    paths: paths,
    fallback: 'blocking',
  }
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
  // console.log(project, 'project')

  const respone = await getSiteInfo(site as string)
  const data = await respone

  // res.setHeader(
  //   'cache-control',
  //   'public s-max-age=900 stale-with-revalidate=899'
  // )
  return {
    props: {
      stringifiedData: JSON.stringify(data),
    },
  }
}

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

  const data = JSON.parse(stringifiedData) as _SiteData

  const meta = {
    title: data.website,
    description: `Welkom bij ${data.website}`,
    logo: '/logo.png',
    ogImage: 'logotje',
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: data.website,
  } as Meta

  return <Layout meta={meta}>Dit is de website van {data.website}</Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { site: 'uplandparcs.localhost:3001' } }]

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
  const data = [
    { domain: 'uplandparcs.localhost:3001', website: 'Uplandparcs' },
    { domain: 'westerbergen.localhost:3001', website: 'Westerbergen' },
  ]

  const project = data.find((p) => p.domain === site)

  return {
    props: {
      stringifiedData: JSON.stringify(project),
    },
  }
}

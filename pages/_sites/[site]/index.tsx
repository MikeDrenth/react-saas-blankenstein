import Layout from '@/components/sites/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { _SiteData, Meta } from '@/types'

interface IndexProps {
  project: []
}

export default function Index({ project }: IndexProps) {
  const router = useRouter()
  if (router.isFallback) return <div>Loader</div>

  const meta = {
    title: project.website,
    description: `Welkom bij ${project.website}`,
    logo: '/logo.png',
    ogImage: 'logotje',
    ogUrl: `https://westerbergen.vercel.pub`,
    subdomain: project.website,
  } as Meta

  return <Layout meta={meta}>Dit is de website van {project.website}</Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { site: 'uplandparcs.localhost:3001' } }]

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = [
    { domain: 'uplandparcs.localhost:3001', website: 'Uplandparcs' },
    { domain: 'westerbergen.localhost:3001', website: 'Westerbergen' },
  ]

  const project = data.find((p) => p.domain === context.params.site)

  return {
    props: { project },
  }
}

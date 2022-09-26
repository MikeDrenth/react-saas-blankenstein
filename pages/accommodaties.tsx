import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Menu from '../components/Menu'
import Accommodaties from '../components/Accommodaties'

import ObjectFilter from '../components/ObjectFilter'

// Import styling
import { StyledLogo } from '../components/styles/StyledLogo'
import { StyledHeader } from '../components/styles/StyledHeader'

import { InferGetServerSidePropsType } from 'next'

export default function Home({
  menuItems,
  accommodaties,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>{` | Blankenstein aan Zee`}</title>
        <meta name="description" content="Welkom bij Blankenstein aan Zee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <StyledHeader>
          <StyledLogo>
            <Link href="/">
              <a>
                <Image
                  width="240px"
                  height="80px"
                  objectFit="cover"
                  src="/images/logo.svg"
                  alt="Blankenstein aan Zee"
                />
              </a>
            </Link>
          </StyledLogo>
          <Menu menu={menuItems} />
        </StyledHeader>
      </main>

      <ObjectFilter></ObjectFilter>
      <Accommodaties accommodaties={accommodaties} />

      <footer></footer>
    </div>
  )
}

export async function getServerSideProps() {
  const [accommodatiesRes, menuItemsRes] = await Promise.all([
    fetch('http://localhost:3000/api/accommodaties', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    fetch('http://localhost:3000/api/menu', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ])
  const [accommodaties, menuItems] = await Promise.all([
    accommodatiesRes.json(),
    menuItemsRes.json(),
  ])

  return {
    props: { accommodaties, menuItems },
  }
}

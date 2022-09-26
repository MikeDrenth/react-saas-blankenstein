import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Menu from '../components/Menu'
import { IFrame } from '../components/IFrame'
import { PageContent } from '../components/PageContent'
import HomeBlocks from '../components/HomeBlocks'
import HeaderImage from '../components/HeaderImage'
import TopBar from '../components/TopBar'

// Import styling
import { StyledLogo } from '../components/styles/StyledLogo'
import { StyledHeader } from '../components/styles/StyledHeader'
import { StyledPageContent } from '../components/styles/StyledPageContent'
import { StyledIntroContent } from '../components/styles/StyledIntroContent'

import { InferGetServerSidePropsType } from 'next'

export default function Home({
  homePage,
  menuItems,
  homeBlocks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { menu_naam, pagina_titel, highlight, inhoud, samenvatting, url } =
    homePage.data[0]

  return (
    <div>
      <Head>
        <title>{`${pagina_titel} | Blankenstein aan Zee`}</title>
        <meta name="description" content="Welkom bij Blankenstein aan Zee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TopBar />
        <StyledHeader>
          <StyledLogo>
            <Link href={url}>
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

        <HeaderImage highlight={highlight}></HeaderImage>

        <HomeBlocks blocks={homeBlocks} />

        <div>
          <StyledIntroContent>
            <IFrame height="350" url={samenvatting} width="100%" />
            <StyledPageContent>
              <PageContent inhoud={inhoud} />
            </StyledPageContent>
          </StyledIntroContent>
        </div>
      </main>

      <footer></footer>
    </div>
  )
}

export async function getServerSideProps() {
  const [homePageRes, menuItemsRes, homeBlocksRes] = await Promise.all([
    fetch('http://localhost:3000/api/post/home', {
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
    fetch('http://localhost:3000/api/home-blocks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ])
  const [homePage, menuItems, homeBlocks] = await Promise.all([
    homePageRes.json(),
    menuItemsRes.json(),
    homeBlocksRes.json(),
  ])

  return {
    props: { homePage, menuItems, homeBlocks },
  }
}

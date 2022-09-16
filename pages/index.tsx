import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Menu from '../components/Menu'
import { IFrame } from '../components/IFrame'
import { PageContent } from '../components/PageContent'
import Block from '../components/Block'

// Import styling
import { StyledLogo } from '../components/styles/StyledLogo'
import { StyledHeader } from '../components/styles/StyledHeader'
import { StyledPageContent } from '../components/styles/StyledPageContent'
import { StyledIntroContent } from '../components/styles/StyledIntroContent'

import { InferGetServerSidePropsType } from 'next'

export default function Home({
  homePage,
  menuItems,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { menu_naam, pagina_titel, highlight, inhoud, samenvatting, url } =
    homePage.data[0]

  return (
    <div>
      <Head>
        <title>{pagina_titel}</title>
        <meta name="description" content="Welkom bij Blankenstein aan Zee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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

        {/* <Block blocks={homeBlocks} /> */}

        <header>
          <Image
            width="1900"
            height="500"
            src={highlight}
            alt="Blankenstein aan Zee"
          />
          <div>
            {/* <h1>Pagina titel: {pagina_titel}</h1> */}

            <StyledIntroContent>
              <IFrame height="350" url={samenvatting} width="100%" />
              <StyledPageContent>
                <PageContent inhoud={inhoud} />
              </StyledPageContent>
            </StyledIntroContent>
          </div>
        </header>
      </main>

      <footer></footer>
    </div>
  )
}

export async function getServerSideProps() {
  const [homePageRes, menuItemsRes] = await Promise.all([
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
  ])
  const [homePage, menuItems] = await Promise.all([
    homePageRes.json(),
    menuItemsRes.json(),
  ])

  return {
    props: { homePage, menuItems },
  }
}

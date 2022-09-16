import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Menu from '../components/Menu'

import { StyledHeader } from '../components/styles/StyledHeader'
import { StyledLogo } from '../components/styles/StyledLogo'

const Post = ({ homePage, menuItems }) => {
  console.log(homePage)
  const { menu_naam, pagina_titel, highlight, inhoud, samenvatting, url } =
    homePage.data[0]

  return (
    <>
      <Head>
        <title>{pagina_titel} | Blankenstein aan Zee</title>
        <meta name="description" content="{inhoud}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

      <Image
        width="1900"
        height="600"
        src={highlight}
        alt="Blankenstein aan Zee"
      />

      <h1>{pagina_titel}</h1>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const [homePageRes, menuItemsRes] = await Promise.all([
    fetch(`http://localhost:3000/api/post/${params.pid}`, {
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

export default Post

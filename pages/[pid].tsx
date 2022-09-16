import { useRouter } from 'next/router'

const Post = ({ homePage }) => {
  console.log(homePage)

  return <p>Hallo</p>
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

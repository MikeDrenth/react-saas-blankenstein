import Head from 'next/head'
import { GetServerSideProps } from 'next'
import middleware from '../middleware'

interface Task {
  task_id: number
  task_subject: string
}

type Tasks = {
  data: Data
}

type Data = {
  data: []
}

type TaskProps = {
  tasks: Tasks
  task_id: number
  task_subject: string
  data: Data
}

import { InferGetServerSidePropsType } from 'next'

export default function Home({
  tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Blankenstein aan Zee</title>
        <meta name="description" content="Welkom bij Blankenstein aan Zee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {/* {tasks.data.map(({ task_id, task_subject }: TaskProps) => (
          <div key={task_id}>
            <li>Id: {task_id}</li>
            <li>{task_subject}</li>
          </div>
        ))} */}
      </ul>
      <footer></footer>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
//   const referer = req.headers.host
//   const response = await fetch(`http://localhost:3000/api/tasks`)
//   const { tasks } = await response.json()

//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=900, stale-while-revalidate=899'
//   )

//   return {
//     props: { tasks },
//   }
// }

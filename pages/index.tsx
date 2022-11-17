import Head from 'next/head'
import { GetServerSideProps } from 'next'

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
        {tasks.data.map(({ task_id, task_subject }: TaskProps) => (
          <div key={task_id}>
            <li>Id: {task_id}</li>
            <li>{task_subject}</li>
          </div>
        ))}
      </ul>
      <footer></footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const response = await fetch(`https://nextjs-saas-delta.vercel.app/api/tasks`)
  const { tasks } = await response.json()

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=900, stale-while-revalidate=899'
  )

  console.log('Fetch naar api/tasks vanuit index')

  return {
    props: { tasks },
  }
}

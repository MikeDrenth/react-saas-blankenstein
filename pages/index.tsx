import Head from 'next/head'

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
            <li>{task_id}</li>
            <li>{task_subject}</li>
          </div>
        ))}
      </ul>
      <footer></footer>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { req } = context
  const res = await fetch(`${req.headers.referer}/api/tasks`)
  const { tasks } = await res.json()

  return {
    props: { tasks },
  }
}

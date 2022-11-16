import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface Task {
  task_id: number
  task_subject: string
}

import { InferGetServerSidePropsType } from 'next'

export default function Home({
  Tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(Tasks)
  return (
    <div>
      <Head>
        <title>Blankenstein aan Zee</title>
        <meta name="description" content="Welkom bij Blankenstein aan Zee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {Tasks.tasks.data.map(({ task_id, task_subject }: Task) => (
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

export async function getServerSideProps({ params }) {
  const [tasksRes] = await Promise.all([
    fetch(`http://localhost:3000/api/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ])
  const [Tasks] = await Promise.all([tasksRes.json()])

  return {
    props: { Tasks },
  }
}

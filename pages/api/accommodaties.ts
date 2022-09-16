import clientPromise from '../../middleware/database'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const client = await clientPromise
    const db = client.db('fakeOffice')
    const allPosts = await db.collection('accommodaties').find({}).toArray()
    res.json({ status: 200, data: allPosts })
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}

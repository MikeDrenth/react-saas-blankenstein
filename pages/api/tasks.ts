import { getAllTasks } from '../../lib/authRequest'

import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const response = await getAllTasks()
  const tasks = await response.json()

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=43200'
  )

  return res.status(200).json({ tasks })
}

export default handler

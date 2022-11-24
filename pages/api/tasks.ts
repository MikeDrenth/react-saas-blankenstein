import { getAllTasks } from '../../lib/authRequest'

import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

const handler = async (
  req: NextRequest,
  res: NextApiResponse
): Promise<void> => {
  console.log(req.nextUrl)
  const response = await getAllTasks()
  const tasks = await response.json()

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=900, stale-while-revalidate=899'
  )

  return res.status(200).json({ tasks })
}

export default handler

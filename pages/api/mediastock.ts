import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // console.log(res)
  // res.status(200).json({ message: 'Hello from Next.js!' })
  const resData = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${process.env.NEXT_PUBLIC_MEDIASTOCK_API}&languages=nl`
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result).data)

  res.status(200).json({ data: resData })
}

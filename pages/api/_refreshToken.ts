import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const body = {
  user: process.env.AUTH_USERNAME,
  password: process.env.AUTH_PASSWORD,
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { data, headers: returnedHeaders } = await axios({
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer 14|b84fVPYjb4cpgvikZMJvRVFtQ4OWtuVzyif1D8Q1`,
      },
      url: `${process.env.AUTH_URL}`,
      data: body,
    })
    Object.entries(returnedHeaders).forEach((keyArr) => {
      res.setHeader(keyArr[0], keyArr[1] as string)
    })
    res.setHeader('token', 'asdasdasdasdasd')
    res.send(res)

    // res.status(results.status).json(results.data)
  } catch (error) {
    console.log(error)
  }
}

export default handler

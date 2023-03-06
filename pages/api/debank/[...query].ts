// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { executeQuery } from '@lib/debank'

type Data = {
  data: any,
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query }: any = req.query;
  const data: any = await executeQuery(query.join('/'), { ...req.query });
  res.status(200).json(data)
}

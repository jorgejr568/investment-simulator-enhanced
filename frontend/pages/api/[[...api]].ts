import axios, { Method } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { constants } from 'http2'

const API = axios.create({
  baseURL: process.env.API_URL,
})
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise((resolve, reject) => {
    const { api: path, ...params } = req.query

    try {
      API.request({
        method: <Method>req.method,
        params,
        url: '/' + (Array.isArray(path) ? path.join('/') : ''),
      })
        .then((response) => {
          res.status(response.status)
          res.json(response.data)
        })
        .catch((e) => {
          const { response } = e
          if (response) {
            res.status(response.status)
            return res.json(response.data)
          }

          throw e
        })
        .finally(resolve)
    } catch (e) {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      res.json({ error: e })
      resolve(e)
    }
  })
}

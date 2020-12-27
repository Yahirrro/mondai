import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

export const apiHandler = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(500).end(error.toString())
  },
  onNoMatch(req, res) {
    res.status(404).end('Not Found')
  },
})

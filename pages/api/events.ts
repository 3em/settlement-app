import { NextApiRequest, NextApiResponse } from 'next'
import { iSettlement } from 'entities/settlement/model/types'

let clients: NextApiResponse<iSettlement>[] = []

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Content-Encoding', 'none')
  res.setHeader('Cache-Control', 'no-cache')

  clients.push(res)

  req.on('close', () => {
    clients = clients.filter(client => client !== res)
  })
}

export const sendEventToAllClients = (data: iSettlement) => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}

export default handler

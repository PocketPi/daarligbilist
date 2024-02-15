import dotenv from 'dotenv'

import express from 'express'
import ViteExpress from 'vite-express'

import cors from 'cors'
import { type BadDriverReportInterface } from '../shared/types'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const prisma = new PrismaClient()

const server = express()

server.use(express.json())
server.use(cors())

server.get('/api/top10', async (_req, res) => {
  const badDrivers = await prisma.bad_drivers.groupBy({
    by: ['licensplate'],
    orderBy: {
      _count: {
        licensplate: 'desc'

      }
    },
    take: 10,
    _count: {
      licensplate: true
    }
  })

  const data = badDrivers.map((item) => { return { licensplate: item.licensplate, count: item._count.licensplate } })

  res.status(200).json(data)
})

server.post('/api/report_bad_driver', async (req, res, next) => {
  try {
    const report: BadDriverReportInterface = req.body
    const result = await prisma.bad_drivers.create({
      data: {
        licensplate: report.licensplate,
        reason: report.reason
      }
    })
    res.json(result)
  } catch (error: any) {
    next(error.message)
  }
})

ViteExpress.listen(server, 3000, () => {
  console.log('Server is running on port 3000')
})

import dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import { type BadDriverReportInterface } from '../shared/types'
import { PrismaClient } from '@prisma/client'
import { testData } from './GenerateTestData'
dotenv.config()

const prisma = new PrismaClient()

const server = express()

server.use(express.json())
server.use(cors())

const port = process.env.SERVER_PORT ?? 4000

server.get('/api/top10', (_req, res) => {
  res.status(404).json({ message: 'Not implemented' })
})

server.post('/api/report_bad_driver', (req, res) => {
  const report: BadDriverReportInterface = req.body
  void
  prisma.bad_drivers.create({
    data: {
      licensplate: report.licensplate,
      reason: report.reason
    }
  })
})

server.get('/api/create_test_data', (_req, res) => {
  void prisma.bad_drivers.createMany({
    data: testData
  })
  res.status(200).json({
    message: 'Test data created'
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

import dotenv from 'dotenv'

import express from 'express'
import ViteExpress from 'vite-express'

import cors from 'cors'
import { type BadDriverReportInterface } from '../shared/types'
import { PrismaClient } from '@prisma/client'
import { Validator, ValidationError, type AllowedSchema } from 'express-json-validator-middleware'

dotenv.config()

const { validate } = new Validator({ verbose: true })

function validationErrorMiddleware(error: any, _request: any, response: any, next: any) {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // Handle the error
    response.status(400).send(error.validationErrors)
    next()
  } else {
    // Pass error on if not a validation error
    next(error)
  }
}

const reportBadDriverSchema: AllowedSchema = {
  type: 'object',
  required: ['licensplate', 'reason'],
  properties: {
    licensplate: {
      type: 'string',
      minLength: 2,
      maxLength: 7
    },
    reason: {
      type: 'string',
      minLength: 10,
      maxLength: 255
    }
  }
}

const prisma = new PrismaClient()

const server = express()

server.use(express.json())
server.use(cors())
server.use(validationErrorMiddleware)

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

server.post('/api/report_bad_driver', validate({ body: reportBadDriverSchema }), async (req, res, next) => {
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

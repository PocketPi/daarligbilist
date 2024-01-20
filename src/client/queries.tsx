import { response } from 'express'
import { type APIResponseInterface, type BadDriverReportInterface } from '../shared/types'
import axios, { type AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

const defaultSettings = {
  DEV_REACT_APP_BASE_URL: 'http://localhost:3000/api',
  REACT_APP_BASE_URL: 'https://daarligbilist.dk/api'
}
const settings = { defaultSettings }

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? settings.defaultSettings.REACT_APP_BASE_URL
      : settings.defaultSettings.DEV_REACT_APP_BASE_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})

export function getBadDrivers (): APIResponseInterface | string {
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const response = await api.get('/top10')
      setData(response.data)
    } catch (error) {
      console.log('getBadDrivers error: ', error)
      return error
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return data
}

export async function reportBadDriver (report: BadDriverReportInterface): Promise<AxiosResponse<BadDriverReportInterface> | string> {
  try {
    const result = api.post<BadDriverReportInterface>('/report_bad_driver', report)
    return await result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('unexpected error: ', error)
      return 'An unexpected error occurred'
    }
  }
}

import { useState, useEffect } from 'react'
import { type BadDriverInfoInterface, type APIResponseInterface, type BadDriverReportInterface } from '../shared/types'
import { get } from './fetchers'
import axios from 'axios'

export const getBadDrivers = (): BadDriverInfoInterface[] => {
  const [data, setData] = useState<BadDriverInfoInterface[]>([])

  const getData = async (): Promise<void> => {
    const { badDrivers } = await get<APIResponseInterface>('http://localhost:4000/api/top10')
    setData(badDrivers)
  }

  useEffect(() => {
    void getData()
  }, [])

  return data
}

export async function reportBadDriver (report: BadDriverReportInterface): Promise<void> {
  try {
    void axios.post<BadDriverReportInterface>('http://localhost:4000/api/report_bad_driver', report)
  } catch (error) {
    console.log(error)
  }
}

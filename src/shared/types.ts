export interface BadDriverReportInterface {
  licensplate: string
  reason: string
}

export interface BadDriverInfoInterface {
  licensplate: string
  count: number
}

export interface APIResponseInterface {
  badDrivers: BadDriverInfoInterface[]
}

import { Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import React from 'react'
import { getBadDrivers } from './queries'
import { type BadDriverInfoInterface } from '../shared/types'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export default function ListBadDrivers (): any {
  const data = getBadDrivers()
  if (data === undefined) {
    return <div>loading...</div>
  } else {
    return (
      <Table size="small">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Nummerplade</StyledTableCell>
            <StyledTableCell align="right">Antal</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.map((row: BadDriverInfoInterface) => (
            <StyledTableRow key={row.licensplate}>
              <StyledTableCell component="th" scope="row">
                {row.licensplate}
              </StyledTableCell>
              <StyledTableCell align="right">{row.count}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

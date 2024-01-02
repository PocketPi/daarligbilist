import { Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import React from 'react';

function createData(
    numberplate: string,
    count: number,
) {
    return { numberplate, count };
}

const rows = [
    createData('CS87100', 39),
    createData('CS87101', 38),
    createData('CS87102', 37),
    createData('CS87103', 36),
    createData('CS87104', 35),
    createData('CS87105', 34),
    createData('CS87106', 33),
    createData('CS87107', 32),
    createData('CS87108', 32),
    createData('CS87109', 31),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ListBadDrivers() {
    return (
        <Table sx={{ width: 300 }} size="small">
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell>Nummerplade</StyledTableCell>
                    <StyledTableCell align="right">Antal</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow
                        key={row.numberplate}
                    >
                        <StyledTableCell component="th" scope="row">
                            {row.numberplate}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.count}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ListBadDrivers;
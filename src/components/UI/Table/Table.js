import React from 'react';
import { Table as MaterialTable, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

function Table({ columns, rows, onBook }) {

  const TableColumns = () => columns.map((column, index) => <TableCell key={index} > {column} </TableCell>)

  const TableRows = () => {
    return rows && rows.length > 0 ?
      rows.map(row => (
        <TableRow key={row.company_id}>
          <TableCell>{row.company}</TableCell>
          <TableCell>{row.city}</TableCell>
          <TableCell>{row.workTime}</TableCell>
          <TableCell>
            <Button variant="contained" onClick={() => onBook(row)} color="primary">
              Book
            </Button>
          </TableCell>
        </TableRow>
      )) :
      <TableRow key={'no-data-row'}>
        <TableCell>
          <Typography variant="h5">
            No companies
          </Typography>
        </TableCell>
      </TableRow>
  };

  return (
    <MaterialTable>
      <TableHead>
        <TableRow key={'table-header-row'}>
          <TableColumns />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRows />
      </TableBody>
    </MaterialTable>
  )
}

export default Table;

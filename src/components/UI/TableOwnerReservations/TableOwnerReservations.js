import React from 'react';
import { Table as MaterialTable, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

function TableOwnerReservations({ columns, rows, bookingAction, actions }) {

  const TableColumns = () => columns.map((column, index) => <TableCell key={index} > {column} </TableCell>)

  const TableRows = () => {
    return rows && rows.length > 0 ?
      rows.map(row => (
        <TableRow key={row.id}>
          <TableCell>{row.company_name}</TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.fullName}</TableCell>
          <TableCell>{row.phone_number}</TableCell>
          <TableCell>{row.email}</TableCell>
          {actions.length > 0 ?
            actions.map(action => (
            <TableCell>
              <Button variant="contained" disabled={row.book_status !== 0} onClick={() => bookingAction({data: row, type: action.type})} color="primary">
                {action.type}
              </Button>
            </TableCell>
            )): ''
          }
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

export default TableOwnerReservations;

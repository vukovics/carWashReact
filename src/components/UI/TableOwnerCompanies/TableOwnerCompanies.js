import React from 'react';
import { Table as MaterialTable, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

function TableOwnerCompanies({ columns, rows, onAction, actions }) {

  const TableColumns = () => columns.map((column, index) => <TableCell key={index} > {column} </TableCell>)

  const TableRows = () => {
    return rows && rows.length > 0 ?
      rows.map(row => (
        <TableRow key={row.company_id}>
          <TableCell>{row.company}</TableCell>
          <TableCell>{row.country}</TableCell>
          <TableCell>{row.city}</TableCell>
          {actions.length > 0 ?
            actions.map(action => (
            <TableCell key={action.type}>
              <Button variant="contained" onClick={() => onAction({data: row, type: action.type})} color="primary">
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

export default TableOwnerCompanies;

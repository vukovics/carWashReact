import React from 'react';
import {
  Table as MaterialTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

function TableSingleCompanyOffers({columns, rows, onEdit, onDelete}) {
  const TableColumns = () =>
    columns.map((column, index) => (
      <TableCell key={index}> {column} </TableCell>
    ));

  const TableRows = () => {
    return rows && rows.length > 0 ? (
      rows.map(row => (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell>{row.price}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => onEdit(row)}
              color="primary"
            >
              Edit
            </Button>
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => onDelete(row)}
              color="secondary"
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow key={'no-data-row'}>
        <TableCell>
          <Typography variant="h5">No Offers</Typography>
        </TableCell>
      </TableRow>
    );
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
  );
}

export default TableSingleCompanyOffers;

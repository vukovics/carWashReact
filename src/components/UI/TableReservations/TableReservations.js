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
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';

function TableReservations({columns, rows, onAction}) {
  const TableColumns = () =>
    columns.map((column, index) => (
      <TableCell key={index}> {column} </TableCell>
    ));

  const checkStatus = status => {
    if(status === 0) {
      return <LinearProgress />
    }else if(status === 1) {
      return  <Chip label="Approved" />
    }else if(status === 2) {
      return <Chip label="Not approved" />
    }
  };

  const TableRows = () => {
    return rows && rows.length > 0 ? (
      rows.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.company_name}</TableCell>
          <TableCell>{row.fullName}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell>{checkStatus(row.book_status)}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => onAction(row)}
              color="primary"
            >
              Decline
            </Button>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow key={'no-data-row'}>
        <TableCell>
          <Typography variant="h5">No companies</Typography>
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

export default TableReservations;

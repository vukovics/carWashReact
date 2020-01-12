import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function StickyHeadTable({rowsFromComponent, onActionOne, onActionTwo, columnsFromComponent}) {
  function prepareRowData() {
    if (rowsFromComponent) {
      return rowsFromComponent;
    } else {
      return [];
    }
  }

  const columns = columnsFromComponent || [];
  const rows = prepareRowData();

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getTableData(column, row) {
    switch(column.id){
      case 'accept':
        return (<Button variant="contained" disabled={row.book_status !== 0} onClick={() => onActionOne(row)} color="primary">Accept</Button>)
      case 'declined':
        return (<Button variant="contained" disabled={row.book_status !== 0} onClick={() => onActionTwo(row)} color="primary">Declined</Button>)
      case 'new':
        return (<Button variant="contained"  onClick={() => onActionOne(row)} color="primary">New</Button>)
      case 'show':
        return (<Button variant="contained"  onClick={() => onActionTwo(row)} color="primary">Show</Button>)
      case 'edit':
        return (<Button variant="contained"  onClick={() => onActionOne(row)} color="primary">Edit</Button>)
      case 'delete':
        return (<Button variant="contained"  onClick={() => onActionTwo(row)} color="secondary">Delete</Button>)
        default : return row[column.id];
    }
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id || row.company_id }>
                    {columns.map(column => {
                     const value = getTableData(column, row);
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

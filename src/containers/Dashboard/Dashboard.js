import React, { Fragment, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const dashboard = props => {

  const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  });

  const dispatch = useDispatch();

  const getCompanies = useCallback(
    () => dispatch(actions.getCompanies()),
    [dispatch]
  );

  useEffect(() => {
    getCompanies();
    
  }, [getCompanies]);

  const classes = useStyles();

  let companies = useSelector(state => state.companies.companies)
  console.log(companies);

  return (
    <Fragment>
      <Grid container spacing={3}>

        { companies.length > 0 ? 
        <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.length > 0 ? companies.map(row => (
              <TableRow key={row.company_id}>
                <TableCell component="th" scope="row">
                  {row.company}
                </TableCell>
                <TableCell align="right">{row.company}</TableCell>
                <TableCell align="right">{row.country}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
              </TableRow>
            )) : []}
          </TableBody>
        </Table>
      </Paper>
       : ''}
      </Grid>
    </Fragment>
  );
};

export default withErrorHandler(dashboard, axios);

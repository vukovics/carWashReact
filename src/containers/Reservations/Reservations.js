import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Grid, Paper} from '@material-ui/core';
import TableReservations from '../../components/UI/TableReservations/TableReservations';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import {makeStyles} from '@material-ui/core/styles';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const reservationsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUserReservations(3));
  }, []);

  const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    tableCompany: {
      padding: '2rem',
    },
  });

  const classes = useStyles();

  function onActionHandle() {
    console.log('asda');
  }

  const tableColumns = ['Company', 'Name', 'Email', 'Date', 'Status', 'Action'];
  const userReservations = useSelector(
    state => state.reservations.userReservations
  );

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>
          <TableReservations
            columns={tableColumns}
            rows={userReservations}
            onAction={onActionHandle}
          />
        </Paper>
      </Grid>
    </Container>
  );
};

export default withErrorHandler(reservationsPage, axios);

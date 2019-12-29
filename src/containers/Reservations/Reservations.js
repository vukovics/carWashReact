import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import TableReservations from '../../components/UI/TableReservations/TableReservations';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import Echo from 'laravel-echo';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import classes from './Reservations.css';

const reservationsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    dispatch(actions.getUserReservations(user.id));
  }, []);

  // window.Echo = new Echo({
  //   broadcaster: 'pusher',
  //   key: '4dc45f15f5cfdb633e0c',
  //   cluster: 'eu',
  //   encrypted: true,
  // });

  // window.Echo.channel('newBookingChannel').listen('newBooking', e => {
  //   dispatch(actions.getUserReservations(user.id));
  // });

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

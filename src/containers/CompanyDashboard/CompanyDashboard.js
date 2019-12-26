import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TableOwnerReservations from '../../components/UI/TableOwnerReservations/TableOwnerReservations';
import Container from '@material-ui/core/Container';
import Echo from 'laravel-echo';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const companyDashboard = () => {
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

  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  useEffect(() => {
    dispatch(actions.getCompanyReservations(user.id));
  }, []);

  const classes = useStyles();

  (window).Echo = new Echo({
    broadcaster: "pusher",
    key: "4dc45f15f5cfdb633e0c",
    cluster: "eu",
    encrypted: true
  });

  (window).Echo.channel("newBookingChannel").listen(
    "newBooking",
    e => {
      dispatch(actions.getCompanyReservations(user.id));
    }
  );

  const handleBooking = booking => {

    booking.type === 'accept'
      ? dispatch(actions.reservationAccept(booking.data.id))
      : dispatch(actions.reservationDeclined(booking.data.id));
  };

  const tableColumns = [
    'Company',
    'Date',
    'Name',
    'Phone Number',
    'Email',
    '',
    '',
  ];
  const companyReservations = useSelector(
    state => state.companies.companyReservations
  );

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>
          <TableOwnerReservations
            columns={tableColumns}
            rows={companyReservations}
            bookingAction={handleBooking}
          />
        </Paper>
      </Grid>
    </Container>
  );
};

export default withErrorHandler(companyDashboard, axios);

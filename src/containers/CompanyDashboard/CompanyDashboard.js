import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import TableOwnerReservations from '../../components/UI/TableOwnerReservations/TableOwnerReservations';
import Container from '@material-ui/core/Container';
import Echo from 'laravel-echo';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import classes from './CompanyDashboard.css';

const companyDashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  useEffect(() => {
    dispatch(actions.getCompanyReservations(user.id));
  }, []);

  const handleBooking = booking => {
    booking.type === 'accept'
      ? dispatch(actions.reservationAccept(booking.data.id))
      : dispatch(actions.reservationDeclined(booking.data.id));
  };

  // window.Echo = new Echo({
  //   broadcaster: 'pusher',
  //   key: '4dc45f15f5cfdb633e0c',
  //   cluster: 'eu',
  //   encrypted: true,
  // });

  // window.Echo.channel('newBookingChannel').listen('newBooking', e => {
  //   dispatch(actions.getCompanyReservations(user.id));
  // });

  const tableColumns = [
    'Company',
    'Date',
    'Name',
    'Phone Number',
    'Email',
    '',
    '',
  ];
  const tableActions = [{type: 'Accept'}, {type: 'Declined'}];
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
            onAction={handleBooking}
            actions={tableActions}
          />
        </Paper>
      </Grid>
    </Container>
  );
};

export default withErrorHandler(companyDashboard, axios);

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import TablePagginated from '../../components/UI/Tables/TablePagginated/TablePagginated'
import Container from '@material-ui/core/Container';
import Echo from 'laravel-echo';
import * as actions from '../../store/actions/index';
import classes from './CompanyDashboard.css';



const companyDashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  useEffect(() => {
    dispatch(actions.getCompanyReservations(user.id));
  }, []);

  const handleAccept = booking => {
    dispatch(actions.reservationAccept(booking.id))
  };

  const handleDeclined = booking => {
    dispatch(actions.reservationDeclined(booking.id));
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

  const companyReservations = useSelector(
    state => state.companies.companyReservations
  );

  const columns = [
    {id: 'company_name', label: 'Company', minWidth: 170},
    {id: 'date', label: 'Date', minWidth: 100},
    {
      id: 'name',
      label: 'Name',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString(),
    },
    {
      id: 'phone_number',
      label: 'Phone Number',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString(),
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'accept',
      label: 'Accept',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'declined',
      label: 'Declined',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2),
    },
  ];

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>
        <TablePagginated
          onActionOne={handleAccept}
          onActionTwo={handleDeclined}
          rowsFromComponent={companyReservations}
          columnsFromComponent={columns}
          />
        </Paper>
      </Grid>
    </Container>
  );
};

export default companyDashboard;

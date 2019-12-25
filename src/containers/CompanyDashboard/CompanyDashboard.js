import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Table from '../../components/UI/Table/Table';
import Container from '@material-ui/core/Container';

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

  let companies = [];
  let tableColumns = [];

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(actions.getCompanies());
  }, []);

  const classes = useStyles();

  const handleBooking = company => {
    // dispatch(actions.getCompanyBookings(company.company_id, history));
  };

  tableColumns = ['Company', 'City', 'Working time', 'Book'];
  companies = useSelector(state => state.companies.companies);

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>
          Company dashboard
          {/* <Table
            columns={tableColumns}
            rows={companies}
            onBook={handleBooking}
          /> */}
        </Paper>
      </Grid>
  </Container>
  );
};

export default withErrorHandler(companyDashboard, axios);

import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Table from '../../components/UI/Table/Table';
import Container from '@material-ui/core/Container';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const dashboard = () => {
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

  const getCompanies = useCallback(() => dispatch(actions.getCompanies()), [
    dispatch,
  ]);

  useEffect(() => {
    getCompanies();
  }, [dispatch]);

  const classes = useStyles();

  const handleBooking = company => {
    dispatch(actions.getCompanyOffers(company.company_id, history));
    dispatch(actions.getSelectedCompany(company.company_id));
  };

  tableColumns = ['Company', 'City', 'Working time', 'Book'];
  companies = useSelector(state => state.companies.companies);

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>
          <Table
            columns={tableColumns}
            rows={companies}
            onBook={handleBooking}
          />
        </Paper>
      </Grid>
  </Container>
  );
};

export default withErrorHandler(dashboard, axios);

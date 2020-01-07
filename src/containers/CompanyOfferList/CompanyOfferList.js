// import React, {useEffect, useParams} from 'react';
// import Container from '@material-ui/core/Container';

// const companyOffersList = () => {
//   let {company_id} = useParams();

//   useEffect(() => {
//     console.log(company_id);
//   }, []);

//   return <Container>Offer LIst</Container>;
// };

// export default companyOffersList;


import React, {useEffect, useParams} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import TableReservations from '../../components/UI/TableReservations/TableReservations';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import {makeStyles} from '@material-ui/core/styles';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const CompanyOfferList = (props) => {
  const dispatch = useDispatch();
  const { match: { params } } = props;
  useEffect(() => {
    console.log(params.id);
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

  const userReservations = useSelector(
    state => state.reservations.userReservations
  );

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>
          Company reservations

        </Paper>
      </Grid>
    </Container>
  );
};

export default CompanyOfferList;



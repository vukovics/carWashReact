import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import {makeStyles} from '@material-ui/core/styles';

const CompanyReservations = () => {
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

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>Company reservations</Paper>
      </Grid>
    </Container>
  );
};

export default CompanyReservations;

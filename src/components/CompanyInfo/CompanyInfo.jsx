import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { red } from '@material-ui/core/colors';

function CompanyInfo({ selectedCompany }) {

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const CompanyInfo = () => {
    return (
      selectedCompany ?
      <div className={classes.root}>
      <Grid container spacing={3} key={selectedCompany.company}>
        <Grid item xs={12}>
            Wash Info
        </Grid>
        <Grid item xs={12}>
            Company name: {selectedCompany.company}
        </Grid>
        <Grid item xs={12}>
            Country: {selectedCompany.country}
        </Grid>
        <Grid item xs={12}>
            City: {selectedCompany.city}
        </Grid>
        <Grid item xs={12}>
            Address: {selectedCompany.address}
        </Grid>
      </Grid>
      </div>
      :
      <div>
        Nista
      </div>
    )
  };

  return (
     <CompanyInfo></CompanyInfo>
  )
}

export default CompanyInfo;

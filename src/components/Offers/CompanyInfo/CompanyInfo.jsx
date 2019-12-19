import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function CompanyInfo({selectedCompany}) {
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
    return selectedCompany ? (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            Company name: {selectedCompany.company}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Country: {selectedCompany.country}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            City: {selectedCompany.city}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {selectedCompany.address
              ? 'Address: ' + selectedCompany.address
              : ''}
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            No info
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return <CompanyInfo></CompanyInfo>;
}

export default CompanyInfo;

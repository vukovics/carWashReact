import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Formik} from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from '@material-ui/pickers';

function OfferForm({selectedOffer, onSubmitRequest}) {
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    textFieldPadding: {
      paddingRight: '1rem',
    },
    buttonPadding: {
      paddingTop: '1rem',
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    container: {
      padding: '10rem',
    },
  }));

  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        date: '',
      }}
      onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true);
        const formatDate = moment(values.date).format('DD/MM/YYYY HH:mm');
        onSubmitRequest(formatDate);
      }}
    >
      {props => {
        const {
          values,
          handleSubmit,
        } = props;
        return selectedOffer ? (
          <form onSubmit={handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-between">
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <DatePicker
                    fullWidth
                    label="Basic example"
                    value={(values.date = selectedDate)}
                    name="date"
                    format="d/MM/yyyy"
                    onChange={handleDateChange}
                    animateYearScrolling
                  />
                </Grid>
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <TimePicker
                    fullWidth
                    clearable
                    ampm={false}
                    name="time"
                    label="24 hours"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </Grid>
                <Grid item xs={6} className={classes.buttonPadding}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </form>
        ) : (
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Select offer
            </Typography>
          </Paper>
        );
      }}
    </Formik>
  );
}

export default OfferForm;

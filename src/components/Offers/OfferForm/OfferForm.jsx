import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function OfferForm({selectedOffer, onSubmitRequesrt}) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  }));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const changeHandler = event => {
    console.log(event);
    // setLoginForm({
    //   ...loginForm,
    //   [event.target.name]: event.target.value,
    // });
  };

  const handleSubmit = event => {
    console.log(event);
    // setLoginForm({
    //   ...loginForm,
    //   [event.target.name]: event.target.value,
    // });
  };

  const classes = useStyles();

  const OfferForm = () => {
    return selectedOffer ? (
      <form className={classes.container} noValidate autoComplete="off">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <TextField
                error
                className={classes.textField}
                label="Firstname"
                margin="normal"
                name="firstname"
                helperText="Incorrect entry."
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                error
                label="Lastname"
                margin="normal"
                name="lastname"
                type="text"
                helperText="Incorrect entry."
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                error
                label="Email"
                margin="normal"
                name="email"
                type="text"
                helperText="Incorrect entry."
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                error
                label="Number"
                margin="normal"
                name="number"
                type="text"
                helperText="Incorrect entry."
              />
            </Grid>
            <Grid item xs={6}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    ) : (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Select Offer</Paper>
        </Grid>
      </Grid>
    );
  };

  return <OfferForm></OfferForm>;
}

export default OfferForm;

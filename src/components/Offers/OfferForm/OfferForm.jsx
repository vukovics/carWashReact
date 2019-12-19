import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Formik} from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from '@material-ui/pickers';

function OfferForm({selectedOffer, onSubmitRequest}) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

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
        email: '',
        firstname: '',
        lastname: '',
        number: '',
        date: '',
      }}
      onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true);
        onSubmitRequest(values);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Required'),
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        number: Yup.string().required('Required'),
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return selectedOffer ? (
          <form onSubmit={handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-between">
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <TextField
                    fullWidth
                    error={errors.firstname && touched.firstname}
                    label="Firstname"
                    name="firstname"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.firstname && touched.firstname && errors.firstname
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <TextField
                    fullWidth
                    error={errors.email && touched.email}
                    label="email"
                    name="email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email && errors.email}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <TextField
                    fullWidth
                    error={errors.lastname && touched.lastname}
                    label="Lastname"
                    name="lastname"
                    value={values.lastname}
                    className={classes.textField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.lastname && touched.lastname && errors.lastname
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <TextField
                    fullWidth
                    error={errors.number && touched.number}
                    label="Number"
                    name="number"
                    value={values.number}
                    className={classes.textField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.number && touched.number && errors.number
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <DatePicker
                    fullWidth
                    label="Basic example"
                    value={(values.date = selectedDate)}
                    name="date"
                    format="MM/dd/yyyy"
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
                    disabled={isSubmitting}
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

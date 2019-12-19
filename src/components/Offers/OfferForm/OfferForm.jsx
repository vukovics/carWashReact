import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Formik} from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function OfferForm({selectedOffer, onSubmitRequesrt}) {
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
        data: '',
      }}
      onSubmit={(values, {setSubmitting}) => {
        console.log('yaas');
        setSubmitting(true);
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Required'),
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        number: Yup.string().required('Required'),
        data: Yup.string().required('Required'),
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return ( selectedOffer ?
          <form onSubmit={handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-between">
                <Grid item xs={6}  className={classes.textFieldPadding}>
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
                    className={classes.textField}
                    value={values.comment}
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
                    className={classes.textField}
                    value={values.comment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.number && touched.number && errors.number
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <KeyboardDatePicker
                    fullWidth
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
                <Grid item xs={6} className={classes.textFieldPadding}>
                  <KeyboardTimePicker
                    fullWidth
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
              type="submit"
              disabled={isSubmitting}
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </form> : 'Select Offer'
        );
      }}
    </Formik>
  );
}

export default OfferForm;

import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import {Formik} from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as actions from '../../store/actions/index';

const register = props => {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      background: '#ffffff',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCountries());
    // dispatch(actions.getCities());
  }, []);

  const countries = useSelector(state => state.user.countries);

  return (
    <Formik
      initialValues={{
        email: '',
        firstname: '',
        lastname: '',
        number: '',
        // country: '',
        password: '',
      }}
      onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true);
        console.log(values);
        // onSubmitRequest(values);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Required'),
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        number: Yup.string().required('Required'),
        // country: Yup.string().required('Required'),
        password: Yup.string()
          .min(6)
          .required('Required'),
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
        return (
          <Container
            maxWidth="sm"
            spacing={0}
            direction="column"
            justify="center"
            style={{minHeight: '100vh'}}
          >
            <Paper className={classes.root}>
              <p>Register</p>
              <form
                className={classes.container}
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
              >
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
                <TextField
                  fullWidth
                  error={errors.email && touched.email}
                  label="Email"
                  name="email"
                  className={classes.textField}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email && errors.email}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  error={errors.password && touched.password}
                  label="Password"
                  name="password"
                  type="password"
                  className={classes.textField}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  error={errors.number && touched.number}
                  label="Number"
                  name="number"
                  value={values.number}
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.number && touched.number && errors.number}
                  margin="normal"
                />
                {/* <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.country}
                    onChange={handleChange}
                    name="country"
                  >
                    {countries.map(country => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.button}
                >
                  Submit
                </Button>
                <Button component={Link} to="/login">
                  Login
                </Button>
              </form>
            </Paper>
          </Container>
        );
      }}
    </Formik>
  );
};

export default register;

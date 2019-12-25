import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import mainImage from '../../assets/images/main.jpg';
import clasessFromCss from './Login.css'

import * as actions from '../../store/actions/index';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    background: '#ffffff',
    flexGrow: 1,
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
  image: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundSize: 'cover',
    justifyContent: 'center',
    backgroundImage: `url(${mainImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
}));

const login = props => {
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const classes = useStyles();
  let history = useHistory();

  const submitHandler = event => {
    event.preventDefault();
    dispatch(actions.loginUser(loginForm.email, loginForm.password, history));
  };

  const changeHandler = event => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div className={classes.image}>
        </div>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.root} xs={6}>
          <p>Login</p>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              label="email"
              margin="normal"
              name="email"
              onChange={changeHandler}
            />
            <TextField
              className={classes.textField}
              label="password"
              margin="normal"
              name="password"
              type="password"
              onChange={changeHandler}
            />
            <Button
              variant="contained"
              onClick={submitHandler}
              color="primary"
              className={classes.button}
            >
              Login
            </Button>
            <Button component={Link} to="/register">
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(mapStateToProps)(login);

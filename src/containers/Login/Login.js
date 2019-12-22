import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import Paper from '@material-ui/core/Paper';

import * as actions from '../../store/actions/index';

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
      <Container
        maxWidth="sm"
        spacing={0}
        direction="column"
        justify="center"
        style={{minHeight: '100vh'}}
      >
        <Paper className={classes.root}>
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
      </Container>
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

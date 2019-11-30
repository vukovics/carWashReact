import React, { useState, useEffect, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import * as actions from '../../store/actions/index';

const register = props => {

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);


  const submitHandler = event => {
    event.preventDefault();
    dispatch(actions.registerUser(registerForm.email, registerForm.password));
  };

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: ''
  })

  const changeHandler = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value
    })
  }


  return (
    <Fragment>
      <div className={classes.Auth}>
          <Link to="/register">Register</Link>
          <form className={classes.container} noValidate autoComplete="off">
            <div>
              <TextField
                xs={5}
                className={classes.textField}
                label="email"
                margin="normal"
                name="email"
                onChange={changeHandler}
              />
              <TextField
                xs={5}
                className={classes.textField}
                label="password"
                margin="normal"
                name="password"
                type="password"
                onChange={changeHandler}
              />
              <Button variant="contained" onClick={submitHandler} color="primary" className={classes.button}>
                Register
          </Button>
            </div>
          </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(register);

import * as actionTypes from './actionTypes';
import {authService} from '../../services/auth.service';
import {snackbarActions as snackbar} from 'material-ui-snackbar-redux';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    token: token,
  };
};

export const getUserSuccess = user => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user: user[0],
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('user');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const loginUser = (email, password, history) => {
  return dispatch => {
    dispatch(authStart());

    authService
      .login(email, password)
      .then(
        user => {
          dispatch(authSuccess(user.data.user.id, user.data.token));
          dispatch(getUserSuccess(user.data.user));
        },
        error => {
          dispatch(
            snackbar.show({
              message: error.message,
            })
          );
        }
      )
      .then(history.push('/dashboard'));
  };
};

export const registerUser = (user, history) => {
  return dispatch => {
    dispatch(authStart());
    authService
      .register(user)
      .then(
        success => {
          dispatch(
            snackbar.show({
              message: success.message,
            })
          );
        },
        error => {
          dispatch(
            snackbar.show({
              message: error.message,
            })
          );
        }
      )
      .then(history.push('/login'));
  };
};



export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(userId, token));
    }
  };
};

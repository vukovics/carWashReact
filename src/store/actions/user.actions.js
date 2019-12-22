import * as actionTypes from './actionTypes';
import { authService } from '../../services/auth.service';
import {snackbarActions as snackbar} from 'material-ui-snackbar-redux';

export const getUserSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user: user[0]
  };
};

export const getCountries = () => {
  return dispatch => {
    authService.getCountries().then(
      countries => {
        dispatch(getCountriesSuccess(countries));
      },
      error => {
        dispatch(
          snackbar.show({
            message: error.message,
          })
        );
      }
    );
  };
};

export const getCountriesSuccess = (countries) => {
  return {
    type: actionTypes.GET_COUNTRIES_SUCCESS,
    countries: countries
  };
};

// export const getCities = () => {
//   return {
//     type: actionTypes.GET_USER_SUCCESS,
//     cities: cities
//   };
// };

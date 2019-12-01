import * as actionTypes from './actionTypes';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import {companyService} from '../../services/company.service'


export const getCompaniesSuccess = (companies) => {
  return {
    type: actionTypes.GET_COMPANIES_SUCCESS,
    allCompanies: companies.data.companies
  };
};

export const getCompanies = () => {
  return dispatch => {
    companyService.getCompanies().then(
      companies => {
        dispatch(getCompaniesSuccess(companies));
      },
      error => {
        dispatch(snackbar.show({
          message: error.message
        }))
      });
  };
};

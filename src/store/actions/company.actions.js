import * as actionTypes from './actionTypes';
import {snackbarActions as snackbar} from 'material-ui-snackbar-redux';
import {companyService} from '../../services/company.service';

export const getCompaniesSuccess = companies => {
  return {
    type: actionTypes.GET_COMPANIES_SUCCESS,
    allCompanies: companies.data.companies,
  };
};

export const getCompanies = () => {
  return dispatch => {
    companyService.getCompanies().then(
      companies => {
        dispatch(getCompaniesSuccess(companies));
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

export const getCompanyOfferSuccess = companyOffers => {
  return {
    type: actionTypes.GET_COMPANY_OFFERS_SUCCESS,
    companyOffers: companyOffers,
  };
};

export const getCompanyOffers = (companyId, history) => {
  return dispatch => {
    companyService
      .getCompanyOffers(companyId)
      .then(
        companyOffers => {
          dispatch(getCompanyOfferSuccess(companyOffers.data.companyOffer));
        },
        error => {
          dispatch(
            snackbar.show({
              message: error.message,
            })
          );
        }
      )
      .then(() => {
        history.push('/offers');
      });
  };
};

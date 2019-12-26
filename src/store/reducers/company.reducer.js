import * as actionTypes from '../actions/actionTypes';

export const initialCompanyState = {
  companies: [],
};

const getCompanies = (state, action) => {
  return {
    ...state,
    companies: action.allCompanies,
  };
};
const getCompanyOffers = (state, action) => {
  return {
    ...state,
    selectedCompanyOffers: action.companyOffers,
  };
};
const getSelectedCompanySuccess = (state, action) => {
  return {
    ...state,
    selectedCompany: action.selectedCompany,
  };
};

const setSelectedOfferSuccess = (state, action) => {
  return {
    ...state,
    selectedOffer: action.selectedOffer,
  };
};

const setCompanyReservationsSuccess = (state, action) => {
  return {
    ...state,
    companyReservations: action.companyReservations,
  };
};

const reducer = (state = initialCompanyState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANIES_SUCCESS:
      return getCompanies(state, action);
    case actionTypes.GET_COMPANY_OFFERS_SUCCESS:
      return getCompanyOffers(state, action);
    case actionTypes.GET_SELECTED_COMPANY_SUCCESS:
      return getSelectedCompanySuccess(state, action);
    case actionTypes.SET_SELECTED_OFFER_SUCCESS:
      return setSelectedOfferSuccess(state, action);
    case actionTypes.GET_COMPANY_RESERVATIONS_SUCCESS:
      return setCompanyReservationsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;

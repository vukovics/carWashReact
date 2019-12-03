import * as actionTypes from '../actions/actionTypes';

export const initialCompanyState = {
  companies: []
};

const getCompanies = (state, action) => {
  return {
    ...state,
    companies: action.allCompanies,
  };
}
const getCompanyOffers = (state, action) => {
  return {
    ...state,
    selectedCompanyOffers: action.companyOffers,
  };
}

const reducer = (state = initialCompanyState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANIES_SUCCESS: return getCompanies(state, action);
    case actionTypes.GET_COMPANY_OFFERS_SUCCESS: return getCompanyOffers(state, action);
    default:
      return state;
  }
};

export default reducer;
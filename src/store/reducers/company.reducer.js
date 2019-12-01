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

const reducer = (state = initialCompanyState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANIES_SUCCESS: return getCompanies(state, action);
    default:
      return state;
  }
};

export default reducer;
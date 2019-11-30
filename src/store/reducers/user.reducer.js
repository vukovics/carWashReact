import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null
};

const setUser = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS: return setUser(state, action);
    default:
      return state;
  }
};

export default reducer;
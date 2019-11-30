import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export const initialUserState = {
  user: null
};

const setUser = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
}

const resetUserState = (state, action) => {
  return updateObject(state, initialUserState);
};

const reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS: return setUser(state, action);
    case actionTypes.AUTH_LOGOUT: return resetUserState(state, action);
    default:
      return state;
  }
};

export default reducer;
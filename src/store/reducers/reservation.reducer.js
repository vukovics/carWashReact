import * as actionTypes from '../actions/actionTypes';

export const initialReservationsState = {
  reservations: [],
  userReservations: []
};

const getReservations = (state, action) => {
  return {
    ...state,
    userReservations: action.reservations,
  };
};

const reducer = (state = initialReservationsState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_RESERVATIONS_SUCCESS:
      return getReservations(state, action);
    default:
      return state;
  }
};

export default reducer;

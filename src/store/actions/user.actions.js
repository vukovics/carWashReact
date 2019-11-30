import * as actionTypes from './actionTypes';

export const getUserSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user: user[0]
  };
};

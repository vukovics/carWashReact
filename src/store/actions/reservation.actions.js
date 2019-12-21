import * as actionTypes from './actionTypes';
import {snackbarActions as snackbar} from 'material-ui-snackbar-redux';
import {reservationService} from '../../services/reservation.service';

export const getUserReservations = userId => {
  return dispatch => {
    reservationService.getUserReservations(userId).then(
      reservations => {
        dispatch(getUserReservationsSuccess(reservations.data.bookings));
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

export const getUserReservationsSuccess = reservations => {
  return {
    type: actionTypes.GET_USER_RESERVATIONS_SUCCESS,
    reservations: reservations,
  };
};

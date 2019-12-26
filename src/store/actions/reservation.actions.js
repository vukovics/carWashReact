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

export const reservationAccept = reservationsId => {
  return dispatch => {
    reservationService.accept(reservationsId).then(
      () => {
        dispatch(
          snackbar.show({
            message: 'Accepted',
          })
        );
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

export const reservationDeclined = reservationsId => {
  return dispatch => {
    reservationService.declined(reservationsId).then(
      () => {
        dispatch(
          snackbar.show({
            message: 'Declined',
          })
        );
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

export const getCompanyReservations = userId => {
  return dispatch => {
    reservationService.getCompanyReservations(userId).then(
      reservations => {
        dispatch(getCompanyReservationsSuccess(reservations.data.bookings));
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

export const getCompanyReservationsSuccess = reservations => {
  return {
    type: actionTypes.GET_COMPANY_RESERVATIONS_SUCCESS,
    companyReservations: reservations,
  };
};

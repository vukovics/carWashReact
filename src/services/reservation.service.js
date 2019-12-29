import axios from 'axios';
export const reservationService = {
    getUserReservations,
    getCompanyReservations,
    accept,
    declined,
    createNewCompanyOffer
};

async function getUserReservations(userId) {
    let url = 'http://localhost:8000/api/booking/' + userId;
    const response = await axios.get(url);
    return response;
}

async function getCompanyReservations(userId) {
    let url = 'http://localhost:8000/api/bookingOwner/' + userId;
    const response = await axios.get(url);
    return response;
}

async function accept(reservationdId) {
    let url = 'http://localhost:8000/api/bookingAccept/' + reservationdId;
    const response = await axios.get(url);
    return response;
}

async function declined(reservationdId) {
    let url = 'http://localhost:8000/api/bookingDeclined/';
    const response = await axios.post(url, {bookingId : reservationdId, reason: ''});
    return response;
}

async function createNewCompanyOffer(offerDetails) {
    let url = 'http://localhost:8000/api/offer/';
    const response = await axios.post(url, offerDetails);
    return response;
}

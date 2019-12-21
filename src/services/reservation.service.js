import axios from 'axios';
export const reservationService = {
    getUserReservations
};

async function getUserReservations(userId) {
    let url = 'http://localhost:8000/api/booking/' + userId;
    const response = await axios.get(url);
    return response;
}

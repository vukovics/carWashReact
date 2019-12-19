import axios from 'axios';

export const authService = {
    login,
    logout,
    register
};

async function login(email, password) {
    const authInfo = {
        email: email,
        password: password
    }

    let url = 'http://localhost:8000/api/login';
    const response = await axios.post(url, authInfo);
    const responseSuccess = await handleResponse(response);
    localStorage.setItem('token', responseSuccess.data.token);
    localStorage.setItem('userId', responseSuccess.data.user[0].id);
    return responseSuccess;
}

function register(email, password) {
    console.log(email, password)
}

function logout() {
    localStorage.removeItem('token');
}

function handleResponse(response) {
    if (response.status === 401) {
        logout();
        const error = response
        return Promise.reject(error);
    }
    return response
}

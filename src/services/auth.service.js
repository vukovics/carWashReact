import axios from 'axios';

export const authService = {
  login,
  logout,
  register,
  getCountries,
};

async function login(email, password) {
  const authInfo = {
    email: email,
    password: password,
  };

  let url = 'http://localhost:8000/api/login';
  const response = await axios.post(url, authInfo);
  const responseSuccess = await handleResponse(response);
  localStorage.setItem('token', responseSuccess.data.token);
  localStorage.setItem('userId', responseSuccess.data.user[0].id);
  return responseSuccess;
}

async function register(user) {
  const registration = {
    email: user.email,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    phone_number: user.number,
  };

  let url = 'http://localhost:8000/api/register';
  const response = await axios.post(url, registration);
  return response;
}

function logout() {
  localStorage.removeItem('token');
}

function handleResponse(response) {
  if (response.status === 401) {
    logout();
    const error = response;
    return Promise.reject(error);
  }
  return response;
}

async function getCountries() {
  let url = 'http://localhost:8000/api/countries';
  const response = await axios.get(url);
  return response.data.countries;
}

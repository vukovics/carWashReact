import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { SnackbarProvider } from 'material-ui-snackbar-redux'
import throtlle from 'lodash/throttle';
import axios from 'axios'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth.reducer';
import userReducer from './store/reducers/user.reducer';
import companiesReducer from './store/reducers/company.reducer';
import { snackbarReducer } from 'material-ui-snackbar-redux'
import { loadState, saveState } from './localStorage/localStorage'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  companies: companiesReducer,
  snackbar: snackbarReducer
});

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (err) {
  return Promise.reject(err);
});

const persistState = loadState();

const store = createStore(rootReducer, persistState, composeEnhancers(
  applyMiddleware(thunk)
));

store.subscribe(throtlle(() => {
  saveState({
    user: store.getState().user
  });
}), 1000);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 3500 }}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

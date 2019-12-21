import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {SnackbarProvider} from 'material-ui-snackbar-redux';
import throtlle from 'lodash/throttle';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth.reducer';
import userReducer from './store/reducers/user.reducer';
import reservationReducer from './store/reducers/reservation.reducer';
import companiesReducer from './store/reducers/company.reducer';
import {snackbarReducer} from 'material-ui-snackbar-redux';
import {loadState, saveState} from './localStorage/localStorage';
import {jwtInterceptor} from './jwtInterceptor/jwtInterceptor';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.css';


const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  reservations: reservationReducer,
  companies: companiesReducer,
  snackbar: snackbarReducer,
});

jwtInterceptor();
const persistState = loadState();

const store = createStore(
  rootReducer,
  persistState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throtlle(() => {
    saveState({
      user: store.getState().user,
    });
  }),
  1000
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider SnackbarProps={{autoHideDuration: 3500}}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

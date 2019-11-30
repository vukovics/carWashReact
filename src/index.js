import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { SnackbarProvider } from 'material-ui-snackbar-redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth.reducer';
import { snackbarReducer } from 'material-ui-snackbar-redux'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

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

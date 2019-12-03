import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './store/reducers/auth.reducer';
import userReducer from './store/reducers/user.reducer';
import companiesReducer from './store/reducers/company.reducer';
import { snackbarReducer } from 'material-ui-snackbar-redux'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  user: userReducer,
  companies: companiesReducer,
  snackbar: snackbarReducer,
})
export default createRootReducer
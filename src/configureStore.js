import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import createRootReducer from './reducers'
import { loadState, saveState } from './localStorage/localStorage'
import throtlle from 'lodash/throttle';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
export const history = createBrowserHistory()

const persistState = loadState();

export default function configureStore(preloadedState) {
  const store = createStore(
    composeEnhancers(
      persistState,
      createRootReducer(history), // root reducer with router state
      preloadedState,
      compose(
        applyMiddleware(
          routerMiddleware(history), // for dispatching history actions
          routerMiddleware(thunk),
        ),
      ),
    )

  )
  store.subscribe(throtlle(() => {
    saveState({
      user: store.getState().user
    });
  }), 1000);

  return store
}


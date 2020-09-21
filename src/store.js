import { createStore, applyMiddleware, compose } from 'redux';
import createReduxPromiseListener from 'redux-promise-listener';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import rootReducer from './modules/rootReducer';
import sagas, {logActions} from './modules/rootSagas';

const sagaMiddleware = createSagaMiddleware();
const reduxPromiseListener = createReduxPromiseListener();

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

let basename = '/';
export let history = createBrowserHistory({basename});

let middleware = [
  sagaMiddleware,
  reduxPromiseListener.middleware,
  routerMiddleware(history),
];


const store = createStore(
  rootReducer(history),
  /* {preloadedState}, */
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

export const promiseListener = reduxPromiseListener; // <---------- IMPORTANT

sagaMiddleware.run(logActions);
sagaMiddleware.run(sagas);

export default store;

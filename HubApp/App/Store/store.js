import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';

import * as reducers from '../Reducers';
import rootSaga from '../Sagas';

// create a saga middleware from our sagas
const sagaMiddleware = createSagaMiddleware(rootSaga);

let createStoreWithMiddleware = () => { // eslint-disable-line immutable/no-let
  throw String('Missing createStore assignment');
};

// Disable development tools on production!
if (process.env.NODE_ENV === 'production') {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk, sagaMiddleware),
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk, sagaMiddleware),
    devTools()
  )(createStore);
}

export default function configureStore(initialState) {
  // Combine all reducers into one root reducer
  const reducer = combineReducers(reducers, initialState);

  // Create the one and only redux store. 🚀
  const store = createStoreWithMiddleware(reducer);

  if (module.hot) {
    // enable hot module replacement for reducers
    module.hot.accept('../Reducers/', () => {
      const nextRootReducer = () => require('../Reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
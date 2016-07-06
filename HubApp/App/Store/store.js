import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import createSagaMiddleware from 'redux-saga';
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
    // autoRehydrate(),
    applyMiddleware(thunk, sagaMiddleware),
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    // autoRehydrate(),
    applyMiddleware(thunk, sagaMiddleware),
    global.reduxNativeDevTools
      ? global.reduxNativeDevTools()
      : nope => nope
  )(createStore);
}

export default function configureStore(initialState) {
  // Combine all reducers into one root reducer
  const reducer = combineReducers(reducers, initialState);

  // Create the one and only redux store. 🚀
  const store = createStoreWithMiddleware(reducer);

  // persistStore(store, {
  //   transform: [immutableTransform({ records: null })],
  //   storage: AsyncStorage,
  // });

  if (module.hot) {
    // enable hot module replacement for reducers
    module.hot.accept('../Reducers/', () => {
      const nextRootReducer = () => require('../Reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

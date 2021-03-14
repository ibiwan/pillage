import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

import { all } from 'redux-saga/effects';

import cache from './sagas/cache';
import medNames from './sagas/medNames';

export default function* rootSaga() {
  yield all([
    ...cache,
    ...medNames,
  ]);
}

import { all, call, put, takeEvery } from 'redux-saga/effects';

import { AsyncStorage } from 'react-native';

import { GET_CACHED, SET_CACHED, setCached } from './actions';

const { setItem, getItem } = AsyncStorage;

function* getCached({ key, defaultValue = null }) {
  console.log('TOOK GET_CACHED', { key, defaultValue, getItem });
  const storedRaw = yield call(getItem, key);
  let fetchedValue;
  try {
    fetchedValue = JSON.parse(storedRaw) ?? defaultValue;
  } catch (e) {
    fetchedValue = defaultValue;
  }
  console.log({ storedRaw, fetchedValue });

  yield put(setCached(key, fetchedValue));
}

// function* setCached(...args) {
//   yield console.log('TOOK SET_CACHED', { args });
// }

function* watchGetCached() {
  yield takeEvery(GET_CACHED, getCached);
}

// function* watchSetCached() {
//   yield takeEvery(SET_CACHED, setCached);
// }

export default function* rootSaga() {
  yield all([
    watchGetCached(),
    //  watchSetCached(),
  ]);
}

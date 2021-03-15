import { call, put, takeEvery } from 'redux-saga/effects';

import { AsyncStorage } from 'react-native';

import {
  GET_CACHED,
  STORE_CACHED,
  setFromCached as setFromCachedAction,
} from '../actions/cache';

const { setItem, getItem } = AsyncStorage;

function* getCachedSaga({ key, defaultValue = null }) {
  const storedRaw = yield call(getItem, key);
  let fetchedValue;
  try {
    fetchedValue = JSON.parse(storedRaw) ?? defaultValue;
  } catch (e) {
    fetchedValue = defaultValue;
  }

  yield put(setFromCachedAction(key, fetchedValue));
}

function* storeCached({ key, value }) {
  yield setItem(key, JSON.stringify(value));
}

function* watchGetCached() {
  yield takeEvery(GET_CACHED, getCachedSaga);
}

function* watchStoreCached() {
  yield takeEvery(STORE_CACHED, storeCached);
}

export default [
  watchGetCached(),
  watchStoreCached(),
];

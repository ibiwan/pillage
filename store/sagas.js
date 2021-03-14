import { all, call, put, takeEvery } from 'redux-saga/effects';

import { AsyncStorage } from 'react-native';

import { GET_CACHED, SET_CACHED } from './actions';

const { setItem, getItem } = AsyncStorage;

function* getCached({ key, defaultValue = null }) {
  console.log('TOOK GET_CACHED', { key, defaultValue, getItem });
  const storedRaw = (yield call(getItem, key)) ?? defaultValue;
  console.log({ storedRaw });
}

function* setCached(...args) {
  yield console.log('TOOK SET_CACHED', { args });
}

const watchGetCached = function* () {
  yield takeEvery(GET_CACHED, getCached);
};

const watchSetCached = function* () {
  yield takeEvery(SET_CACHED, setCached);
};

export default function* rootSaga() {
  yield all([watchGetCached(), watchSetCached()]);
}

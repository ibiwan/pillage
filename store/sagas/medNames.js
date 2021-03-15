import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import {
  SET_FROM_CACHED,
  getCached as getCachedAction,
  storeCached,
} from '../actions/cache';

import {
  ADD_MED_NAME,
  FETCH_MED_NAMES,
  STORE_MED_NAMES,
  fetchMedNames as fetchMedNamesAction,
  setMedNames as setMedNamesAction,
  storeMedNames as storeMedNamesAction,
} from '../actions/medNames';

import {
  getMedNames,
  MED_NAMES_KEY,
} from '../selectors';

function* fetchMedNamesSaga() {
  console.log('fetchMedNamesSaga: will getCachedAction');
  yield put(getCachedAction(MED_NAMES_KEY, []));
}

function* storeMedNamesSaga({ value }) {
  console.log('storeMedNamesSaga: will storeCached');
  yield put(storeCached(MED_NAMES_KEY, value));
  console.log('storeMedNamesSaga: will fetchMedNamesSaga');
  yield put(fetchMedNamesAction());
}

function* setMedNamesSaga({ value }) {
  yield put(setMedNamesAction(value));
}

function* addMedNameSaga() {
  const currentList = yield select(getMedNames);
  yield put(storeMedNamesAction([...currentList, '']));
}

export function* watchFetchMedNames() {
  yield takeEvery(FETCH_MED_NAMES, fetchMedNamesSaga);
}

export function* watchStoreMedNames() {
  yield takeEvery(STORE_MED_NAMES, storeMedNamesSaga);
}

export function* watchSetFromCached() {
  yield takeEvery(SET_FROM_CACHED, setMedNamesSaga);
}

export function* watchAddMedName() {
  yield takeEvery(ADD_MED_NAME, addMedNameSaga);
}

export default [
  watchFetchMedNames(),
  watchStoreMedNames(),
  watchSetFromCached(),
  watchAddMedName(),
];

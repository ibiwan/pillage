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
  FETCH_MED_NAMES,
  STORE_MED_NAMES,
  ADD_MED_NAME,
  EDIT_MED_NAME,
  DELETE_MED_NAME,
  fetchMedNames as fetchMedNamesAction,
  storeMedNames as storeMedNamesAction,
  setMedNames as setMedNamesAction,
} from '../actions/medNames';

import {
  getMedNames,
  MED_NAMES_KEY,
} from '../selectors';

function* fetchMedNamesSaga() {
  yield put(getCachedAction(MED_NAMES_KEY, []));
}

function* storeMedNamesSaga({ value }) {
  yield put(storeCached(MED_NAMES_KEY, value));

  yield put(fetchMedNamesAction());
}

function* setMedNamesSaga({ value }) {
  yield put(setMedNamesAction(value));
}

function* addMedNameSaga() {
  const currentList = yield select(getMedNames);

  yield put(storeMedNamesAction([...currentList, '']));
}

function* editMedNameSaga({ i, value }) {
  console.log({ i, value });
  const currentList = yield select(getMedNames);
  const newList = [...currentList];
  newList[i] = value;

  yield put(storeMedNamesAction(newList));
}

function* deleteMedNameSaga({ i }) {
  const currentList = yield select(getMedNames);
  const newList = [
    ...currentList.slice(0, i),
    ...currentList.slice(i + 1),
  ];

  yield put(storeMedNamesAction(newList));
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

export function* watchEditMedName() {
  yield takeEvery(EDIT_MED_NAME, editMedNameSaga);
}

export function* watchDeleteMedName() {
  yield takeEvery(DELETE_MED_NAME, deleteMedNameSaga);
}

export default [
  watchFetchMedNames(),
  watchStoreMedNames(),
  watchSetFromCached(),
  watchAddMedName(),
  watchEditMedName(),
  watchDeleteMedName(),
];

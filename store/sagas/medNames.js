import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { v4 as uuidv4 } from 'uuid';

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
  const updatedValue = value.map((item) => {
    if (typeof item === 'string') {
      return {
        id: uuidv4(),
        name: item,
      };
    }

    return item;
  });

  yield put(storeCached(MED_NAMES_KEY, updatedValue));

  yield put(fetchMedNamesAction());
}

function* setMedNamesSaga({ value }) {
  yield put(setMedNamesAction(value));
}

function* addMedNameSaga() {
  const currentList = yield select(getMedNames);

  const newItem = {
    id: uuidv4(),
    name: '',
  };

  yield put(storeMedNamesAction([
    ...currentList,
    newItem,
  ]));
}

function* editMedNameSaga({ i, value }) {
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

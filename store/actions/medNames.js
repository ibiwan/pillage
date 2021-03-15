export const FETCH_MED_NAMES = 'FETCH_MED_NAMES';
export const STORE_MED_NAMES = 'STORE_MED_NAMES';
export const SET_MED_NAMES = 'SET_MED_NAMES';
export const ADD_MED_NAME = 'ADD_MED_NAME';
export const DELETE_MED_NAME = 'DELETE_MED_NAME';
export const EDIT_MED_NAME = 'EDIT_MED_NAME';

export const fetchMedNames = () => ({
  type: FETCH_MED_NAMES,
});

export const storeMedNames = (value) => ({
  type: STORE_MED_NAMES,
  value,
});

export const setMedNames = (medNames) => ({
  type: SET_MED_NAMES,
  medNames,
});

export const addMedName = () => ({
  type: ADD_MED_NAME,
});

export const deleteMedName = (i) => ({
  type: DELETE_MED_NAME,
  i,
});

export const editMedName = (i, value) => ({
  type: EDIT_MED_NAME,
  i,
  value,
});

export const GET_CACHED = 'GET_CACHED';
export const SET_FROM_CACHED = 'SET_FROM_CACHED';
export const STORE_CACHED = 'STORE_CACHED';

export const getCached = (key, defaultValue) => ({
  type: GET_CACHED,
  key,
  defaultValue,
});

export const setFromCached = (key, value) => ({
  type: SET_FROM_CACHED,
  key,
  value,
});

export const storeCached = (key, value) => ({
  type: STORE_CACHED,
  key,
  value,
});

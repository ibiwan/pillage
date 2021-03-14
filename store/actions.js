export const GET_CACHED = 'GET_CACHED';
export const SET_CACHED = 'SET_CACHED';

export const getCached = (key, defaultValue) => ({
  type: GET_CACHED,
  key,
  defaultValue,
});

export const setCached = (key, value) => ({
  type: SET_CACHED,
  key,
  value,
});

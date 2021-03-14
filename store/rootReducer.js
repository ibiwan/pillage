import { combineReducers } from 'redux';

import { SET_CACHED } from './actions';

const defaultMedListState = [];

const medListReducer = (state = defaultMedListState, action) => {
  console.log({ action });

  const { type, ...context } = action;

  switch (type) {
    case SET_CACHED: {
      const { key, value } = context;

      return {
        ...state,
        [key]: value,
      };
    }

    // case GET_CACHED: // fallthru to default: no state change
    default:
      return state;
  }
};

export default combineReducers({
  medList: medListReducer,
});

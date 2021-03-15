import { combineReducers } from 'redux';

import { SET_MED_NAMES } from './actions/medNames';

const defaultMedListState = [];

const medListReducer = (state = defaultMedListState, action) => {
  const { type, ...context } = action;

  console.log('medListReducer', JSON.stringify({
    type,
    context,
  }));

  switch (type) {
    case SET_MED_NAMES: {
      const { medNames } = context;

      return {
        ...state,
        medNames,
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  medList: medListReducer,
});

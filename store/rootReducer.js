import { combineReducers } from 'redux';

import { v4 as uuidv4 } from 'uuid';

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

      const updatedMedNames = medNames.map((item) => {
        if (typeof item === 'string') {
          return {
            id: uuidv4(),
            name: item,
          };
        }

        return { ...item, id: item.id || uuidv4() };
      });

      return {
        ...state,
        medNames: updatedMedNames,
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  medList: medListReducer,
});

import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './AppContainer';
import configureStore from '../store/configureStore';

const store = configureStore();

const AppProvider = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default AppProvider;
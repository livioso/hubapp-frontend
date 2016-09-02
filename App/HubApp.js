import React from 'react';
import HubAppNavigator from './HubAppNavigator';
import { Provider } from 'react-redux';
import configureStore from './Store/store';

export const HubApp = () => {
  return (
    <Provider store={configureStore()}>
      <HubAppNavigator />
    </Provider>
  );
};

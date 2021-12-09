/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/router/AppRouter';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/configure-store';
import {PersistGate} from 'redux-persist/integration/react';

const App: () => Node = () => {
  // Set an initializing state whilst Firebase connects
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppRouter />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

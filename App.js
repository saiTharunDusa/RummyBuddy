import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './navigation/MainNavigation.js';
import {Provider} from "react-redux"
import store from './redux/store.js';

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <MainNavigation/>
    </NavigationContainer>
    </Provider>
  );
}

export default App;

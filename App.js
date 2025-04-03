import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {Provider} from "react-redux"
import store from './redux/store.js';
import RootNavigation from './navigation/RootNavigation.js';

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootNavigation/>
    </NavigationContainer>
    </Provider>
  );
}

export default App;

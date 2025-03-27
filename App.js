import React from 'react';
import {
  ScrollView,
  SafeAreaView, Text
} from 'react-native';


import Title from './components/Title/Title.js';
import Button from './components/Button/Button.js';
import Home from './screens/Home/Home.js';

const App = () => {
  return (
    <SafeAreaView>
      <Title/>
      <Home/>
    </SafeAreaView>
  );
}

export default App;

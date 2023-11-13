import { RootSiblingParent } from 'react-native-root-siblings';
import React from 'react';
import Navigation from './navigation/navigation';

const App = () => {
  return (
    <RootSiblingParent>
    <Navigation />
    </RootSiblingParent>
  );
};

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SeachScreen from './src/screens/seach';
import ResultVideos from './src/screens/ResultVideos';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SeachScreen" component={SeachScreen} />
        <Stack.Screen name="ResultVideos" component={ResultVideos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

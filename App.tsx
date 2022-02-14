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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import SeachScreen from './src/screens/seach';
import ResultVideos from './src/screens/ResultVideos';

export type RootStackList = {
  SeachScreen: undefined;
  ResultVideos: {
    videoId: string;
    title: string;
    channelTitle: string;
  };
};
export type PropsSeachScreen = NativeStackScreenProps<RootStackList, 'SeachScreen'>;
export type PropsResultVideos = NativeStackScreenProps<RootStackList, 'ResultVideos'>;

const App = () => {
  const Stack = createNativeStackNavigator<RootStackList>();
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

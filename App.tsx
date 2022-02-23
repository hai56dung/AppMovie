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
import SeachText from './src/screens/seach-text';

export type RootStackList = {
  SeachScreen: undefined;
  ResultVideos: {
    videoId: string;
    title: string;
    channelTitle: string;
  };
  SeachText: {
    seach: string;
  };
};
export type PropsSeachScreen = NativeStackScreenProps<RootStackList, 'SeachScreen'>;
export type PropsResultVideos = NativeStackScreenProps<RootStackList, 'ResultVideos'>;
export type PropsSeachText = NativeStackScreenProps<RootStackList, 'SeachText'>;

const App = () => {
  const Stack = createNativeStackNavigator<RootStackList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SeachScreen"
          component={SeachScreen}
          options={{ headerShown: false, headerTransparent: true }}
        />
        <Stack.Screen
          name="ResultVideos"
          component={ResultVideos}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SeachText" component={SeachText} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import SplashScreen from './src/screens/SplashScreen';
import store from './src/controller/store';
import LoginScreen from './src/screens/LoginScreen';
import Home from './src/screens/home';
import SetupAccountScreen from './src/screens/SetupAccountScreen';
import ProfileScreen from './src/screens/ProfileScreen/index';
import SeachScreen from './src/screens/seach';
import ResultVideos from './src/screens/ResultVideos';
import SeachText from './src/screens/seach-text';
import HomeScreen from './src/nav/HomeScreen';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SetupAccountScreen: undefined;
  Home: undefined;
  ProfileScreen: undefined;
  SeachScreen: undefined;
  ResultVideos: {
    videoId: string;
    title: string;
    channelTitle: string;
  };
};
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SetupAccountScreen" component={SetupAccountScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Home" component={Home} />
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
    </Provider>
  );
}
export default App;

const styles = StyleSheet.create({});

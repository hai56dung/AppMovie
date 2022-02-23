import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import { Provider } from 'react-redux';
import store from './src/controller/store';
import LoginScreen from './src/screens/LoginScreen';
import Home from './src/screens/Home';
import SetupAccountScreen from './src/screens/SetupAccountScreen';
import ProfileScreen from './src/screens/ProfileScreen/index';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SetupAccountScreen: undefined;
  Home: undefined;
  ProfileScreen: undefined;
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
<<<<<<< HEAD
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
=======
          <Stack.Screen name="Home" component={Home} />
>>>>>>> 212057ddd81a0274c822cb964793854b0f4dd619
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;

const styles = StyleSheet.create({});

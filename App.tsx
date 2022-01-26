import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import { Provider } from 'react-redux';
import store from './src/controller/store';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/home';
import SetupAccountScreen from './src/screens/SetupAccountScreen';
const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SetupAccountScreen: undefined;
  Home: undefined;
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;

const styles = StyleSheet.create({});

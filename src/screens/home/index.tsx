import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../nav/HomeScreen';
import SearchScreen from '../../nav/SearchScreen';
import LibraryScreen from '../../nav/LibraryScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{ 
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#A7A7A7',
        tabBarStyle: {backgroundColor: '#2D2E30'} 
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Image source={require('../../assets/icons/home/home.png')} style={{tintColor: color}} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <Image source={require('../../assets/icons/search/search.png')} style={{tintColor: color}}/>;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <Image source={require('../../assets/icons/library.png')} style={{tintColor: color}}/>;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

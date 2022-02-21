import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Albums from '../../screens/Albums/Albums';
import Artists from '../../screens/Artists/Artists';
import Playlists from '../../screens/PlayLists/Playlists';
import { View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const NavMaterial = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Playlists" component ={Playlists} />
        <Tab.Screen name="Artists" component={Artists} />
        <Tab.Screen name="Albums" component={Albums} />
      </Tab.Navigator>
  );
}

export default NavMaterial;
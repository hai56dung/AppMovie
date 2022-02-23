import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NavMaterial from './NavMaterial';

const Tab = createMaterialTopTabNavigator();

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{flexDirection: 'row', marginTop: 48}}>
        <Text style={{fontSize: 32, fontWeight: '500', color: '#FFF'}}>Music</Text>
        <View style={{width: 23}}></View>
        <Text style={{fontSize: 32, fontWeight: '500', color: '#FFF', opacity: 0.4}}>Podcasts</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 60}}>
        <NavMaterial />
      </View>
      <View style={{marginTop: 22, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/Playlist.png')} />
        </TouchableOpacity>
        <Text style={{paddingLeft: 12,color: '#FFF', fontSize: 16, fontWeight: '500'}}>Create playlist</Text>
      </View>
    </View>
  )
}

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingLeft: 16,
  }
})
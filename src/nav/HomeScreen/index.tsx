import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <StatusBar barStyle="light-content" />
      <View style={{ alignItems: 'center'}}>
        <Image source={require('../../assets/images/Pages/imghome.png')} />
        <Text style={{fontWeight: '700', fontSize: 46, color: '#FFF', textAlign: 'center', position: 'absolute', paddingTop: 82}}>Dance Gavin{'\n'}Dance </Text>
      </View>
      <Text style={{fontSize: 10, fontWeight: '400', color: '#A7A7A7', textAlign: 'center', marginTop: 24,}}>1,030,903 MONTHLY LISTENERS</Text>
      <TouchableOpacity style={{marginHorizontal: 117, height: 38, backgroundColor: '#00CB51', marginTop: 32, alignItems: 'center',justifyContent: 'center' ,borderRadius: 26}}>
        <Text style={{fontSize: 12, fontWeight: '600', color: '#FFFFFF'}}>SHUFFLE PLAY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

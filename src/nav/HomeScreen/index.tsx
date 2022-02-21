import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ItemMusic from './ItemMusic';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Image source={require('../../assets/images/Pages/imghome.png')} />
        <Text style={styles.txtHeader}>Dance Gavin{'\n'}Dance </Text>
      </View>
      <Text style={styles.txtSub}>1,030,903 MONTHLY LISTENERS</Text>
      <TouchableOpacity style={styles.btnSuf}>
        <Text style={styles.txtSuf}>SHUFFLE PLAY</Text>
      </TouchableOpacity>
      <Text style={styles.txtTopMusic}>Popular</Text>
      <ItemMusic />
      <TouchableOpacity style={styles.btnFooter}>
        <Text style={styles.txtFooter}>SEE DISCOGRAPHY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { alignItems: 'center' },
  txtHeader: {
    fontWeight: '700',
    fontSize: 46,
    color: '#FFF',
    textAlign: 'center',
    position: 'absolute',
    paddingTop: 82,
  },
  txtSub: {
    fontSize: 10,
    fontWeight: '400',
    color: '#A7A7A7',
    textAlign: 'center',
    marginTop: 24,
  },
  btnSuf: {
    marginHorizontal: 117,
    height: 38,
    backgroundColor: '#00CB51',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },
  txtSuf: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  txtTopMusic: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 64,
  },
  btnFooter: {
    marginHorizontal: 117,
    height: 38,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    borderColor: '#FFFFFF',
    marginBottom: 20,
  },
  txtFooter: {marginTop: 25 ,fontSize: 12, fontWeight: '500', color: '#FFFFFF' },
});

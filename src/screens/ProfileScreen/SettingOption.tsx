import { StyleSheet, Text, View, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import React from 'react';

interface IProps {
  icon: ImageSourcePropType;
  content: string;
}

const SettingOption = ({ icon, content }: IProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
  );
};

export default SettingOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  icon: {
    tintColor: '#FFF',
    marginRight: 20,
  },
  content: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    color: '#FFF',
  },
});

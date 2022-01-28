import { ActivityIndicator, ColorValue, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
export interface ILoader {
  size: 'small' | 'large';
  color: ColorValue;
  loading: boolean;
}

const Loader = React.memo(({ size, color, loading }: ILoader) => {
  return (
    <Modal visible={loading} transparent={true}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={size} color={color} />
        </View>
      </View>
    </Modal>
  );
});

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  loaderContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
});

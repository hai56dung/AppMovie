import { ActivityIndicator, ColorValue, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
export interface IModalLoader {
  size: 'small' | 'large';
  color: ColorValue;
}
export type LoaderModalRef = {
  show: () => void;
  hide: () => void;
};
const ModalLoader = React.forwardRef<LoaderModalRef, IModalLoader>(({ size, color }, ref) => {
  const [visible, setVisible] = React.useState(false);
  React.useImperativeHandle(ref, () => {
    return {
      show: () => {
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    };
  });
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={size} color={color} />
        </View>
      </View>
    </Modal>
  );
});

export default ModalLoader;

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

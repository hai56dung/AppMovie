import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';

const AppButton: React.FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Button title={'Click'} onPress={() => console.log('click')} />
      </View>
    </SafeAreaView>
  );
};

export default AppButton;

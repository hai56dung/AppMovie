import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'App';
import { useAppDispatch, useAppSelector } from '../../controller/store';
import { setUserUid } from '../../controller/userSlice';

const SplashScreen = () => {
  // auth().signOut();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>();

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!initializing) {
    if (user) {
      const uid = user.uid;
      dispatch(setUserUid(uid));
      firestore()
        .collection('user')
        .doc(uid)
        .get()
        .then((res) => res.data())
        .then((data) => {
          if (data?.auth.isNewUser) {
            navigation.navigate('SetupAccountScreen');
          } else {
            navigation.navigate('Home');
          }
        });
    } else {
      navigation.navigate('LoginScreen');
    }
  }
  return (
    <View style={styles.container}>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

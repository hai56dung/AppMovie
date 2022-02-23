import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../controller/store';
import SettingOption from './SettingOption';
import auth from '@react-native-firebase/auth';
import { setDefaultUser } from '../../controller/userSlice';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'App';
import Loader from '../../components/app-modal-loader';

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const userInfor = useAppSelector((state) => state.userSlice);
  const [loading, setLoading] = React.useState(false);

  const logout = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        dispatch(setDefaultUser());
        navigation.navigate('LoginScreen');
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image
              style={styles.avatar}
              source={{
                uri: userInfor.user.photoUri,
              }}
            />
            <TouchableOpacity style={styles.editBtn}>
              <Image source={require('../../assets/icon/edit.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userInfor.user.name}</Text>
        </View>
        <View style={styles.body}>
          <SettingOption icon={require('../../assets/icon/key.png')} content={'Account'} />
          <SettingOption icon={require('../../assets/icon/bell.png')} content={'Notifications'} />
          <SettingOption icon={require('../../assets/icon/help.png')} content={'Help'} />
          <SettingOption icon={require('../../assets/icon/invite.png')} content={'Invite'} />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              logout();
            }}>
            <Text style={styles.logoutBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Loader size={'large'} color={'#1ED760'} loading={loading} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#111111',
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    width: 157,
    height: 157,
    borderRadius: 15,
    backgroundColor: 'black',
  },
  editBtn: {
    position: 'absolute',
    bottom: 10,
    right: -10,
  },
  name: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  body: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logoutBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ED760',
    borderRadius: 10,
  },
  logoutBtnTxt: {
    color: '#FFFFFF',
  },
});

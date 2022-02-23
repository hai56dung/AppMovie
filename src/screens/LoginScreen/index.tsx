import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import OtpModal, { OtpModalRef } from './OtpModal';
import { useAppDispatch, useAppSelector } from '../../controller/store';
import { setCurrentUser } from '../../controller/userSlice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'App';
import { CallingCode, Country } from 'react-native-country-picker-modal';
import CountryPicker from 'react-native-country-picker-modal';
import Loader from '../../components/app-modal-loader';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const otpModalRef = React.useRef() as React.MutableRefObject<OtpModalRef>;
  const [countryName, setCountryName] = React.useState<Country['name']>('Vietnam');
  const [callingCode, setCallingCode] = React.useState<CallingCode>('84');
  const [countryPickerVisible, setCountryPickerVisible] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [avoidView, setAvoidView] = React.useState(true);
  const [canPress, setCanPress] = React.useState(false);
  const [confirm, setConfirm] = React.useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = React.useState('');
  const dispatch = useAppDispatch();
  const userInfor = useAppSelector((state) => state.userSlice);

  const signInWithPhoneNumber = (phoneNumber: string) => {
    setLoading(true);
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((confirmation) => {
        setConfirm(confirmation);
        setLoading(false);
        otpModalRef.current.show();
      })
      .catch((e) => {
        setLoading(false);
        Alert.alert('Try again', 'Invalid phone number');
      });
  };

  const createNewUserOnFirebase = (uid: string) => {
    firestore()
      .collection('user')
      .doc(uid)
      .set(userInfor)
      .then(() => {
        setLoading(false);
        navigation.navigate('SetupAccountScreen');
      });
  };

  const handleOldUserLogin = (uid: string) => {
    firestore()
      .collection('user')
      .doc(uid)
      .get()
      .then((res) => res.data())
      .then((data) => {
        setLoading(false);
        if (data?.auth.isNewUser) {
          navigation.navigate('SetupAccountScreen');
        } else {
          dispatch(
            setCurrentUser({
              ...userInfor.user,
              name: data?.user.name,
              photoUri: data?.user.photoUri,
            }),
          );
          navigation.navigate('ProfileScreen');
        }
      });
  };

  const confirmCode = () => {
    setLoading(true);
    confirm
      ?.confirm(code)
      .then((res) => {
        if (!res || !res.additionalUserInfo || !res.user) return;
        const uid = res.user.uid;
        const isNewUser = res.additionalUserInfo.isNewUser;
        if (isNewUser) {
          createNewUserOnFirebase(uid);
        } else {
          handleOldUserLogin(uid);
        }
        setConfirm(undefined);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        Alert.alert('Try again', 'Invalid code', [
          {
            text: 'ok',
            onPress: () => {
              otpModalRef.current.show();
            },
          },
        ]);
      });
  };

  navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
  });

  return (
    <KeyboardAvoidingView
      enabled={avoidView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Get started.</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.inputField}>
              <CountryPicker
                withFlag={true}
                withCallingCode={true}
                withAlphaFilter={true}
                visible={countryPickerVisible}
                onClose={() => {
                  setCountryPickerVisible(false);
                }}
                onSelect={(country: Country) => {
                  setCountryName(country.name);
                  setCallingCode(country.callingCode[0]);
                }}
              />
              <View style={styles.inputTitleContainer}>
                <Text style={styles.inputTitle}>PHONE NUMBER</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCountryPickerVisible(true);
                  }}>
                  <Text style={styles.inputCountryTitle}>
                    Country set to {countryName}.{' '}
                    <Text style={styles.inputTitleStrong}>Change</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputText}>
                <View style={styles.inputCountry}>
                  <Text>+{callingCode}</Text>
                </View>
                <TextInput
                  style={{ flex: 1, height: 40 }}
                  maxLength={10}
                  placeholder="123456789"
                  keyboardType="number-pad"
                  onChangeText={(value) => {
                    if (value.length < 9) {
                      setCanPress(false);
                    } else {
                      setCanPress(true);
                    }
                    setPhoneNumber(`+${callingCode}${value}`);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              disabled={!canPress}
              style={[
                styles.btn,
                {
                  backgroundColor: canPress ? '#1ED760' : '#EDEDED',
                },
              ]}
              onPress={() => {
                signInWithPhoneNumber(phoneNumber);
              }}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: canPress ? '#FFF' : '#9f9f9f',
                  },
                ]}>
                Request OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <OtpModal
        ref={otpModalRef}
        code={code}
        setCode={setCode}
        confirmCode={confirmCode}
        setAvoidView={setAvoidView}
      />
      <Loader size={'large'} color={'#1ED760'} loading={loading} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 50,
    color: '#FFF',
  },
  body: {
    justifyContent: 'center',
    paddingBottom: 50,
  },
  inputField: {
    marginBottom: 30,
  },
  inputTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputTitle: {
    color: '#FFF',
    fontSize: 14,
  },
  inputCountryTitle: {
    color: '#FFF',
    fontSize: 12,
  },
  inputTitleStrong: {
    color: '#1ED760',
  },
  inputText: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputCountry: {
    height: 40,
    justifyContent: 'center',
    borderRightColor: '#9f9f9f',
    borderRightWidth: 1,
    paddingRight: 10,
    marginRight: 10,
  },
  btn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

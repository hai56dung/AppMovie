import {
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
import OtpModal, { OtpModalRef } from './OtpModal';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch, useAppSelector } from '../../controller/store';
import { setUserUid } from '../../controller/userSlice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'App';
import { CallingCode, Country } from 'react-native-country-picker-modal';
import CountryPicker from 'react-native-country-picker-modal';
import ModalLoader, { LoaderModalRef } from '../../components/app-modal-loader';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const otpModalRef = React.useRef() as React.MutableRefObject<OtpModalRef>;
  const loaderModalRef = React.useRef() as React.MutableRefObject<LoaderModalRef>;
  const [countryName, setCountryName] = React.useState<Country['name']>('Vietnam');
  const [callingCode, setCallingCode] = React.useState<CallingCode>('84');
  const [countryPickerVisible, setCountryPickerVisible] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [confirm, setConfirm] = React.useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = React.useState('');
  const dispatch = useAppDispatch();
  const userInfor = useAppSelector((state) => state.userSlice);

  async function signInWithPhoneNumber(phoneNumber: string) {
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((confirmation) => {
        setConfirm(confirmation);
        otpModalRef.current.show();
      })
      .catch((e) => console.log(e));
  }

  async function confirmCode() {
    loaderModalRef.current.show();
    confirm
      ?.confirm(code)
      .then((res) => {
        if (!res || !res.additionalUserInfo || !res.user) return;
        const uid = res.user.uid;
        const isNewUser = res.additionalUserInfo.isNewUser;
        dispatch(setUserUid(uid));
        if (isNewUser) {
          firestore()
            .collection('user')
            .doc(uid)
            .set(userInfor)
            .then(() => {
              loaderModalRef.current.hide()
              navigation.navigate('SetupAccountScreen');
            });
        } else {
          firestore()
            .collection('user')
            .doc(uid)
            .get()
            .then((res) => res.data())
            .then((data) => {
              loaderModalRef.current.hide()
              if (data?.auth.isNewUser) {
                navigation.navigate('SetupAccountScreen');
              } else {
                navigation.navigate('Home');
              }
            });
        }
      })
      .catch((e) => console.log('Invalid code.'));
  }

  return (
    <KeyboardAvoidingView
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
                  maxLength={11}
                  placeholder="123456789"
                  keyboardType="phone-pad"
                  onChangeText={(value) => {
                    setPhoneNumber(`+${callingCode}${value}`);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: phoneNumber.length >= 11 ? '#1ED760' : '#EDEDED',
                },
              ]}
              onPress={() => {
                if (phoneNumber.length < 11) return;
                signInWithPhoneNumber(phoneNumber);
              }}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: phoneNumber.length >= 11 ? '#FFF' : '#9f9f9f',
                  },
                ]}>
                Request OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <OtpModal ref={otpModalRef} code={code} setCode={setCode} confirmCode={confirmCode} />
      <ModalLoader ref={loaderModalRef} size={'large'} color={'#1ED760'} />
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

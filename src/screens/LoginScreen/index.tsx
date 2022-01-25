import {
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
import { useAppDispatch, useAppSelector } from '../../controller/store';
import { IUserState, setUser } from '../../controller/userSlice';
const LoginScreen = () => {
  const modalRef = React.useRef() as React.MutableRefObject<OtpModalRef>;
  const inputRef = React.useRef() as React.MutableRefObject<TextInput>;
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [confirm, setConfirm] = React.useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = React.useState('');
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.userSlice);
  async function signInWithPhoneNumber(phoneNumber: string) {
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((confirmation) => {
        setConfirm(confirmation);
        modalRef.current.show();
      })
      .catch((e) => console.log(e));
  }

  async function confirmCode() {
    confirm
      ?.confirm(code)
      .then((res) => {
        if (!res || !res.additionalUserInfo || !res.user) return;
        const userInfor: IUserState = {
          user: {
            name: '',
            photoUrl: '',
            phoneNumber: '',
            uid: res.user.uid,
          },
          auth: {
            isNewUser: res.additionalUserInfo.isNewUser,
          },
        };
        dispatch(setUser(userInfor));
      })
      .catch((e) => console.log('Invalid code.'));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => {
          inputRef.current.blur();
        }}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Get started.</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.form}>
              <Text style={styles.formTitle}>PHONE NUMBER</Text>
              <View style={styles.formInput}>
                <TextInput
                  ref={inputRef}
                  placeholder="+84123456789"
                  keyboardType="phone-pad"
                  onChangeText={(value) => {
                    setPhoneNumber(value);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                signInWithPhoneNumber(phoneNumber);
              }}>
              <Text style={styles.btnText}>Request OTP</Text>
            </TouchableOpacity>
          </View>
          <OtpModal ref={modalRef} code={code} setCode={setCode} confirmCode={confirmCode} />
        </View>
      </TouchableWithoutFeedback>
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
  form: {
    marginBottom: 30,
  },
  formTitle: {
    marginBottom: 5,
    color: '#FFF',
  },
  formInput: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  btn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ED760',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700',
  },
});

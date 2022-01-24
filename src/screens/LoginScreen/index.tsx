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

const LoginScreen = () => {
  const modalRef = React.useRef() as React.MutableRefObject<OtpModalRef>;
  const inputRef = React.useRef() as React.MutableRefObject<TextInput>;
  const [code, setCode] = React.useState('');
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
                <TextInput ref={inputRef} placeholder="+84123456789" keyboardType="phone-pad" />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                modalRef.current.show();
              }}>
              <Text style={styles.btnText}>Request OTP</Text>
            </TouchableOpacity>
          </View>
          <OtpModal ref={modalRef} code={code} setCode={setCode} />
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

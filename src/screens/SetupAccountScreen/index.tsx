import {
  Image,
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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'App';
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../controller/store';
import Loader from '../../components/app-modal-loader';

const SetupAccountScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [photoUri, setPhotoUri] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const userInfor = useAppSelector((state) => state.userSlice);

  const pickupPhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 200,
      maxHeight: 200,
    };
    launchImageLibrary(options, (res) => {
      if (res.assets) {
        const uri = 'data:image/jpeg;base64,' + res.assets[0].base64;
        setPhotoUri(uri);
      }
    });
  };

  const updateUserOnFirebase = () => {
    setLoading(true);
    firestore()
      .collection('user')
      .doc(userInfor.user.uid)
      .get()
      .then((res) => res.data())
      .then((data) => {
        const updateUser = {
          user: {
            ...data?.user,
            name: lastName + '' + firstName,
            photoUri,
          },
          auth: {
            isNewUser: false,
          },
        };
        firestore().collection('user').doc(userInfor.user.uid).update(updateUser);
      })
      .then(() => {
        setLoading(false);
        navigation.navigate('Home');
      });
  };

  navigation.addListener('beforeRemove', (e) => {
    auth().signOut();
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Let’s get you setup.</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.inputField}>
              <Text style={styles.inputTitle}>PROFILE IMAGE</Text>
              <TouchableOpacity
                style={styles.inputImage}
                onPress={() => {
                  pickupPhoto();
                }}>
                {photoUri ? (
                  <Image
                    style={styles.inputImage}
                    source={{
                      uri: photoUri,
                    }}
                  />
                ) : (
                  <Image source={require('../../assets/images/uploadProfileImage.png')} />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.inputField}>
                <Text style={styles.inputTitle}>First Name</Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder="First Name"
                    onChangeText={(value) => {
                      setFirstName(value);
                    }}
                  />
                </View>
              </View>
              <View style={styles.inputField}>
                <Text style={styles.inputTitle}>Last Name</Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder="Last Name"
                    onChangeText={(value) => {
                      setLastName(value);
                    }}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: firstName && lastName && photoUri ? '#1ED760' : '#ededed',
                },
              ]}
              onPress={() => {
                if (firstName && lastName && photoUri) {
                  updateUserOnFirebase();
                }
              }}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: firstName && lastName && photoUri ? '#FFF' : '#9f9f9f',
                  },
                ]}>
                Complete Setup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {loading && <Loader size={'large'} color={'#1ED760'} />}
    </KeyboardAvoidingView>
  );
};

export default SetupAccountScreen;

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
  inputTitle: {
    marginBottom: 5,
    color: '#FFF',
  },
  inputImage: {
    width: 157,
    height: 157,
    borderRadius: 5,
  },
  inputText: {
    width: 157,
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
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

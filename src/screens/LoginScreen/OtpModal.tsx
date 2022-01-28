import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

export type OtpModalRef = {
  show: () => void;
  hide: () => void;
};

export type OtpModalProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  confirmCode: () => void;
  setAvoidView: React.Dispatch<React.SetStateAction<boolean>>;
};
interface ICode {
  inputRef: React.MutableRefObject<TextInput>;
  value: string;
}

const Code = ({ inputRef, value }: ICode) => {
  return (
    <TouchableOpacity
      style={styles.code}
      onPress={() => {
        inputRef.current.focus();
      }}>
      <Text style={styles.codeText}>{value}</Text>
    </TouchableOpacity>
  );
};
const height = Dimensions.get('window').height;
const OtpModal = React.forwardRef<OtpModalRef, OtpModalProps>(
  ({ code, setCode, confirmCode, setAvoidView }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [keyboardShown, setKeyboardShown] = React.useState(false);
    const [canPress, setCanPress] = React.useState(false);
    const inputRef = React.useRef() as React.MutableRefObject<TextInput>;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(height)).current;
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

    const formatCode = () => {
      let arr = code.split('');
      while (arr.length < 6) {
        arr.push('');
      }
      return arr;
    };

    const handleAnimatedIn = () => {
      Animated.parallel(
        [
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ],
        {
          stopTogether: false,
        },
      ).start();
    };

    const handleAnimatedOut = (time: number) => {
      Animated.parallel(
        [
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: time,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: height,
            duration: time,
            useNativeDriver: true,
          }),
        ],
        {
          stopTogether: false,
        },
      ).start();
    };

    const close = () => {
      const time = 200;
      setTimeout(() => {
        setVisible(false);
      }, time);
      handleAnimatedOut(time);
      return time;
    };

    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShown(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false);
    });

    return (
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          setAvoidView(true);
        }}
        onShow={() => {
          setCode('');
          setAvoidView(false);
          setCanPress(false);
          handleAnimatedIn();
        }}
        onDismiss={() => {
          setAvoidView(true);
        }}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={(e) => {
            if (e.target != e.currentTarget) return;
            if (keyboardShown) {
              Keyboard.dismiss();
              return;
            }
            close();
          }}>
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
              },
            ]}>
            <Animated.View
              style={[
                styles.modal,
                {
                  transform: [
                    {
                      translateY: slideAnim,
                    },
                  ],
                },
              ]}>
              <View style={styles.codeContainer}>
                {formatCode().map((item, index) => {
                  return <Code inputRef={inputRef} value={item} />;
                })}
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
                  setTimeout(confirmCode, close());
                }}>
                <Text
                  style={[
                    styles.btnText,
                    {
                      color: canPress ? '#fff' : '#9f9f9f',
                    },
                  ]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <TextInput
              style={{
                width: 0,
                height: 0,
                opacity: 0,
              }}
              maxLength={6}
              keyboardType="number-pad"
              onChangeText={(value) => {
                if (value.length == 6) {
                  setCanPress(true);
                } else {
                  setCanPress(false);
                }
                setCode(value);
              }}
              ref={inputRef}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  },
);

export default OtpModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  modal: {
    height: 200,
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  code: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  codeText: {
    fontSize: 42,
  },
  btn: {
    width: 200,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

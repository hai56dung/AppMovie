import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
export type OtpModalRef = {
  show: () => void;
};
export type OtpModalProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  confirmCode: () => {};
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
const OtpModal = React.forwardRef<OtpModalRef, OtpModalProps>((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const inputRef = React.useRef() as React.MutableRefObject<TextInput>;
  React.useImperativeHandle(ref, () => {
    return {
      show: () => {
        setVisible(true);
      },
    };
  });
  const formatCode = () => {
    let arr = props.code.split('');
    while (arr.length < 6) {
      arr.push('');
    }
    return arr;
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableOpacity
        style={styles.conntainer}
        onPress={() => {
          props.setCode('');
          setVisible(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.codeContainer}>
            {formatCode().map((item, index) => {
              return <Code inputRef={inputRef} value={item} />;
            })}
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              props.confirmCode();
            }}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TextInput
        maxLength={6}
        keyboardType="number-pad"
        onChangeText={(value) => {
          props.setCode(value);
        }}
        ref={inputRef}
      />
    </Modal>
  );
});

export default OtpModal;

const styles = StyleSheet.create({
  conntainer: {
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
    backgroundColor: '#1ED760',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700',
  },
});

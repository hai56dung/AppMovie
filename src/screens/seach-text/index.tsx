import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { PropsSeachText } from 'App';

interface ResDataTextSeach {
  item: { id: number; title: string };
}

interface filterMasterData {
  id: number;
  title: string;
}

const SeachText: React.FC<PropsSeachText> = (navigation) => {
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [seach, setseach] = useState('');

  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  const fetchPosts = () => {
    const apiURL = 'https://61dc2bcc591c3a0017e1a76f.mockapi.io/textseach';
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setfilterdData(responseJson);
        setmasterData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const searchFilter = (text: string) => {
    if (text) {
      const newData = masterData.filter((item: filterMasterData) => {
        const itemData = item.title ? item.title : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setseach(text);
    } else {
      setfilterdData(masterData);
      setseach(text);
    }
  };
  const ItemView = ({ item }: ResDataTextSeach) => {
    return <Text style={styles.itemStyle}>{item.title}</Text>;
  };

  const ItemSeparatorView = () => {
    return <View style={styles.ItemSeparatorView} />;
  };

  return (
    <SafeAreaView style={styles.styleScreen}>
      <View style={styles.comboIntBtn}>
        <View style={styles.formInput}>
          <TextInput
            placeholder="Seach"
            value={seach}
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
        <Text
          style={styles.btnStyle}
          onPress={() => {
            navigation.navigate('SeachScreen', {
              seach: seach,
            });
          }}>
          Tìm Kiếm
        </Text>
      </View>
      <FlatList
        data={filterdData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  comboIntBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 12,
    paddingTop: 12,
    backgroundColor: 'gray',
    borderRadius: 20,
  },
  formInput: {
    height: 40,
    margin: 11,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '70%',
  },
  itemStyle: {
    padding: 25,
    color: 'white',
    fontSize: 17,
  },
  ItemSeparatorView: {
    height: 0.5,
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    flexDirection: 'column-reverse',
  },
  styleScreen: {
    backgroundColor: 'black',
  },
});
export default SeachText;

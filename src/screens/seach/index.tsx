import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ResultVideos from '../ResultVideos';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const SeachScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearchYouTube = async () => {
    let res = await axios({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        maxResults: '3',
        key: 'AIzaSyD2GnEFOMzweuiOPk3eeG9Pyc7tIcaI5XI',
        type: 'video',
        q: query,
      },
    });

    if (res && res.data && res.data.items) {
      let raw = res.data.items;
      let result = [];
      if (raw && raw.length > 0) {
        raw.map((item) => {
          let object = {};
          object.id = item.id.videoId;
          object.title = item.snippet.title;
          object.author = item.snippet.channelTitle;
          object.imageId = item.snippet.thumbnails.high.url;
          result.push(object);
        });
      }
      setVideos(result);
    }
    console.log('dadsa', result);
  };
  return (
    <SafeAreaView>
      <View style={styles.backGround}>
        <View style={styles.formInput}>
          <TextInput
            placeholder="Seach"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </View>
        <Button onPress={handleSearchYouTube} title="Tìm Kiếm" />
        <ScrollView style={styles.body}>
          {videos &&
            videos.length > 0 &&
            videos.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(navigation);
                    navigation.navigate('ResultVideos', {
                      itemId: item.id,
                      title: item.title,
                      author: item.author,
                    });
                  }}
                  style={styles.cardVideo}
                  key={item.id}>
                  <View style={styles.left}>
                    <Image style={styles.styleImgItem} source={{ uri: item.imageId }} />
                  </View>
                  <View style={styles.right}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View>
                      <Text style={styles.author}>{item.author}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SeachScreen;

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: 'black',
  },
  styleTextInput: {
    backgroundColor: 'while',
    height: 40,
    margin: 11,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  formInput: {
    height: 40,
    margin: 11,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  body: {
    marginTop: 10,
  },
  styleImgItem: {
    width: 400,
    height: 240,
  },
  imageIcon: {
    width: 70,
    height: 70,
  },
  cardVideo: {
    marginBottom: 10,
  },
  left: {},
  right: {
    marginLeft: 10,
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginTop: 5,
  },
  author: {
    color: 'white',
  },
});

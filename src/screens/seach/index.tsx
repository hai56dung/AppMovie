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
import React, { useState } from 'react';
import axios from 'axios';
import { PropsSeachScreen } from 'App';

interface ResponseDataSearch {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface ResultSearch {
  videoId: string;
  title: string;
  channelTitle: string;
  url: string;
}

const result: ResultSearch[] = [];

const SeachScreen: React.FC<PropsSeachScreen> = ({ navigation }) => {
  const [videos, setVideos] = useState<ResultSearch[]>([]);
  const [query, setQuery] = useState('');

  const handleSearchYouTube = async () => {
    const res = await axios({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        maxResults: 10,
        key: 'AIzaSyAy5IfUp0iZvsv7qSigkmqgwzWsrw4rUTk',
        type: 'video',
        q: query,
      },
    });

    if (res && res.data && res.data.items) {
      const raw = res.data.items;

      if (raw && raw.length > 0) {
        raw.map(({ id, snippet }: ResponseDataSearch) => {
          const { videoId } = id;
          const { title, channelTitle, thumbnails } = snippet;

          result.push({
            videoId,
            title,
            channelTitle,
            url: thumbnails.high.url,
          });
        });
      }
      setVideos(result);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.backGround}>
        <View style={styles.formInput}>
          <TextInput
            placeholder="Seach"
            value={query}
            onChangeText={(value: string) => setQuery(value)}
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
                    navigation.navigate('ResultVideos', {
                      videoId: item.videoId,
                      title: item.title,
                      channelTitle: item.channelTitle,
                    });
                  }}
                  style={styles.cardVideo}
                  key={item.videoId}>
                  <View style={styles.left}>
                    <Image style={styles.styleImgItem} source={{ uri: item.url }} />
                  </View>
                  <View style={styles.right}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View>
                      <Text style={styles.author}>{item.channelTitle}</Text>
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

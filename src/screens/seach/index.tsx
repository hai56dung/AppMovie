import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { useDebounce } from 'react-use';

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

const SeachScreen: React.FC<PropsSeachScreen> = ({ navigation }) => {
  const [videos, setVideos] = useState<ResultSearch[]>([]);
  const [valueSearch, setValueSearch] = useState('');

  useDebounce(() => handleSearchYouTube(valueSearch), 1000, [valueSearch]);

  const handleSearchYouTube = async (value: string) => {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        key: 'AIzaSyAy5IfUp0iZvsv7qSigkmqgwzWsrw4rUTk',
        type: 'video',
        q: value,
      },
    });

    if (res && res.data && res.data.items) {
      const raw = res.data.items;
      if (raw && raw.length > 0) {
        const result: ResultSearch[] = [];

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

        setVideos(result);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.comboIntBtn}>
          <View style={styles.formInput}>
            <TextInput
              placeholder="Seach"
              value={valueSearch}
              onChangeText={(value: string) => setValueSearch(value)}
            />
          </View>
        </View>

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
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

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
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
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

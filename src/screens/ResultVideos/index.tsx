import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import YouTubePlayer from 'react-native-youtube-iframe';

interface resultsVideo {
  route: {
    params: {
      videoId: string;
      title: string;
      channelTitle: string;
      url: string;
    };
  };
}

const ResultVideos = ({ route }: resultsVideo) => {
  return (
    <SafeAreaView style={styles.backGround}>
      <View>
        <YouTubePlayer height={225} play={true} videoId={route.params.videoId} />
        <View>
          <Text style={styles.title}>{route.params.title}</Text>
          <Text style={styles.author}>{route.params.channelTitle}</Text>
          <View style={styles.contentNumber}>
            <View style={styles.itemContentNumber}>
              <Text style={styles.numberLike}>40 K</Text>
              <Text style={styles.textLike}>Lượt thích</Text>
            </View>
            <View>
              <Text style={styles.numberLike}>103.312.321</Text>
              <Text style={styles.textLike}>Lượt Xem</Text>
            </View>
            <View>
              <Text style={styles.numberLike}>103.312.321</Text>
              <Text style={styles.textLike}>Lượt Xem</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultVideos;

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 10,
    borderTopColor: '#333',
    borderTopWidth: 1,
    fontWeight: 'bold',
  },
  author: {
    color: 'white',
    margin: 10,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  contentNumber: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#333',
    borderTopWidth: 2,
    paddingTop: 14,
  },
  numberLike: {
    color: 'white',
  },
  textLike: {
    color: 'white',
  },
  itemContentNumber: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

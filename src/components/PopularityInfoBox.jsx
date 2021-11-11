import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  popularityInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    paddingBottom: 10
  },
  infoTab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  counts: {
    fontWeight: 'bold',
  },
});

const PopularityInfoBox = ({ item }) => {
  return (
    <View style={styles.popularityInfo}>
      <View testID="stargazersCount" style={styles.infoTab}>
        {item.stargazersCount >= 1000 ? (
          <Text style={styles.counts}>
            {Math.round((item.stargazersCount / 1000) * 10) / 10}k
          </Text>
        ) : (
          <Text style={styles.counts}>{item.stargazersCount}</Text>
        )}
        <Text>Stars</Text>
      </View>
      <View testID="forksCount" style={styles.infoTab}>
        {item.forksCount >= 1000 ? (
          <Text style={styles.counts}>
            {Math.round((item.forksCount / 1000) * 10) / 10}k
          </Text>
        ) : (
          <Text style={styles.counts}>{item.forksCount}</Text>
        )}
        <Text>Forks</Text>
      </View>
      <View testID="reviewCount" style={styles.infoTab}>
        <Text style={styles.counts}>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View testID="ratingAverage" style={styles.infoTab}>
        <Text style={styles.counts}>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

export default PopularityInfoBox;

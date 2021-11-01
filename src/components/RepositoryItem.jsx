import React from 'react';
import { View, StyleSheet } from 'react-native';

import PersonalInfoBox from './PersonalInfoBox';
import PopularityInfoBox from './PopularityInfoBox';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 'auto',
  },

});
const RepositoryItem = ({ item }) => (
  <View style={styles.container} key={item.fullName}>
    <PersonalInfoBox item={item}/>
    <PopularityInfoBox item={item}/>
  </View>
);
export default RepositoryItem;

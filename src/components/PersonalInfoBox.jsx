import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 20,
  },
  personalInfoBox: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
  },
  languageTag: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 7,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  personalInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
  },
  desciption: {
    paddingTop: 3,
    paddingBottom: 5,
  },
});

const PersonalInfoBox = ({ item }) => {
  return (
    <View style={styles.personalInfoBox}>
      <Image
        style={styles.image}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      />
      <View style={styles.personalInfo}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.desciption}>{item.description}</Text>
        <Text style={styles.languageTag}>{item.language}</Text>
      </View>
    </View>
  );
};

export default PersonalInfoBox;

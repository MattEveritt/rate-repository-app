import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tabText: {
    color: 'white',
    padding: 20,
  },
});

const AppBarTab = ({ link, text }) => {
  console.log(link)
  return (
    <Pressable>
      <Link to={link}>
        <Text style={styles.tabText}>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import AuthStorage from '../utils/authStorage';
import { useApolloClient } from '@apollo/client';

import { AUTHORIZED_USER } from '../graphql/queries';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
  },
  tabText: {
    color: 'white',
    padding: 20,
  },
});

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER);
  const client = useApolloClient();
  const authStorage = new AuthStorage();

  if ( !data ) return null

  const signOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/repositories" text="Repositories" />
        {data.authorizedUser ? (
          <Pressable onPress={signOut}>
            <Text style={styles.tabText}>Sign Out</Text>
          </Pressable>
        ) : (
          <AppBarTab link="/sign-in" text="Sign in" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

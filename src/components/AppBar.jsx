import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import AuthStorage from '../utils/authStorage';
import { useApolloClient } from '@apollo/client';

import { AUTHORIZED_USER } from '../graphql/queries';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useHistory } from 'react-router';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBackground,
        display: 'flex',
        flexDirection: 'row',
    },
    tabView: {
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
    const history = useHistory();

    if (!data) return null;

    const signOut = () => {
        authStorage.removeAccessToken();
        client.resetStore();
        history.push('/');
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab link="/" text="Repositories" />
                {data.authorizedUser ? (
                    <View style={styles.tabView}>
                        <AppBarTab link="/add-review" text="Create a Review" />
                        <AppBarTab link="/my-reviews" text="My Reviews" />
                        <Pressable onPress={signOut}>
                            <Text style={styles.tabText}>Sign Out</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View style={styles.tabView}>
                        <AppBarTab link="/sign-in" text="Sign in" />
                        <AppBarTab link="/sign-up" text="Sign up" />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;

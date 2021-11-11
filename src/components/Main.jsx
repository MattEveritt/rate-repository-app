import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import AddReview from './AddReview';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackground,
        width: 'auto',
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Route path="/sign-in" exact>
                    <SignIn />
                </Route>
                <Route path="/add-review" exact>
                    <AddReview /> 
                </Route>
                <Route path="/my-reviews" exact>
                    <MyReviews /> 
                </Route>
                <Route path="/sign-up" exact>
                    <SignUp /> 
                </Route>
                <Route path="/:id" exact>
                    <SingleRepository />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;

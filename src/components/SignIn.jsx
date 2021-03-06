import React from 'react';
import { useHistory } from 'react-router';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSign';
import AuthStorage from '../utils/authStorage';
import { ApolloClient, useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    textInput: {
        borderColor: theme.colors.textSecondary,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 20,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        fontSize: 20,
        paddingLeft: 15,
    },
    singInButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.colors.primary,
        height: 60,
        borderRadius: 4,
    },
    signInButton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
});

export const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput
                name="username"
                placeholder="Username"
                style={styles.textInput}
                testID="username"
            />
            <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry={true}
                style={styles.textInput}
                testID="password"
            />
            <Pressable onPress={onSubmit} testID="submitButton">
                <View style={styles.singInButtonContainer}>
                    <Text style={styles.signInButton}>Sign in</Text>
                </View>
            </Pressable>
        </View>
    );
};

export const SignInContainer = ({ onSubmit }) => {
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(1, 'Username is too short')
            .required('Username is required'),
        password: yup
            .string()
            .min(1, 'Password is too short')
            .required('Password is required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignIn = () => {
    const authClass = new AuthStorage();
    const client = useApolloClient();
    const history = useHistory();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            console.log('data', data.authorize);
            authClass.setAccessToken(data.authorize);
            const token = authClass.getAccessToken();
            client.resetStore();
            if (token) {
                history.push('/');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SignInContainer onSubmit={onSubmit} />
    );
};

export default SignIn;

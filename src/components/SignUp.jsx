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
import useSignUp from '../hooks/useSignUp';

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
    singUpButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.colors.primary,
        height: 60,
        borderRadius: 4,
    },
    signUpButton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
});

export const SignUpForm = ({ onSubmit }) => {
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
            <FormikTextInput
                name="passwordConfirm"
                placeholder="Password confirmation"
                secureTextEntry={true}
                style={styles.textInput}
                testID="passwordConfirm"
            />
            <Pressable onPress={onSubmit} testID="submitButton">
                <View style={styles.singUpButtonContainer}>
                    <Text style={styles.signUpButton}>Sign up</Text>
                </View>
            </Pressable>
        </View>
    );
};

export const SignUpContainer = ({ onSubmit }) => {
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
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null])
            .required('Password is required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignUp = () => {
    const authClass = new AuthStorage();
    const client = useApolloClient();
    const history = useHistory();
    const [signIn] = useSignIn();
    const [signUp] = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signUp({ username, password });
            const { data } = await signIn({ username, password });
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

    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

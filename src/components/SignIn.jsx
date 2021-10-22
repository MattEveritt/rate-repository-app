import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          style={styles.textInput}
        />
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput}
        />
      <View style={styles.singInButtonContainer}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.signInButton}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
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

export default SignIn;

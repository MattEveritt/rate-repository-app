import React from 'react';
import { useHistory } from 'react-router';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { useApolloClient } from '@apollo/client';
import { useAddReview } from '../hooks/useAddReview';

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
    addReviewButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.colors.primary,
        height: 60,
        borderRadius: 4,
    },
    addReviewButton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
});

const AddReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput
                name="ownerName"
                placeholder="Repository owner name"
                style={styles.textInput}
                testID="ownerName"
            />
            <FormikTextInput
                name="repositoryName"
                placeholder="Repository name"
                style={styles.textInput}
                testID="repositoryName"
            />
            <FormikTextInput
                name="rating"
                placeholder="Rating between 0 and 100"
                style={styles.textInput}
                testID="rating"
            />
            <FormikTextInput
                name="text"
                placeholder="Review"
                style={styles.textInput}
                testID="text"
                multiline={true}
            />
            <Pressable onPress={onSubmit} testID="submitButton">
                <View style={styles.addReviewButtonContainer}>
                    <Text style={styles.addReviewButton}>Add Review</Text>
                </View>
            </Pressable>
        </View>
    );
};

export const AddReviewContainer = ({ onSubmit }) => {
    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
    };

    const validationSchema = yup.object().shape({
        ownerName: yup
            .string()
            .min(1, 'Owner name is too short')
            .required('Owner name is required'),
        repositoryName: yup
            .string()
            .min(1, 'Repository name is too short')
            .required('Repository name is required'),
        rating: yup
            .number('Rating must be a number')
            .max(100, 'rating must be between 0 and 100')
            .positive('Rating must be a positive number')
            .integer('Rating must be a whole number')
            .required('Rating is required'),
        text: yup
            .string()
            .min(1, 'Review is too short')
            .required('Review is required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <AddReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const AddReview = () => {
    const client = useApolloClient();
    const history = useHistory();
    const [addReview] = useAddReview();

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating: number, text } = values;
        const rating = parseInt(number)

        try {
            const {data} = await addReview({
                repositoryName,
                ownerName,
                rating,
                text,
            });
            client.resetStore();
            if (data) {
                history.push(`/${data.createReview.repositoryId}`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return <AddReviewContainer onSubmit={onSubmit} />;
};

export default AddReview;

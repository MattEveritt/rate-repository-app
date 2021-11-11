import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Pressable,
    Alert,
} from 'react-native';
import { useParams, useHistory } from 'react-router-native';
import { format } from 'date-fns';
import { useMutation, useQuery } from '@apollo/client';

import useDeleteReview from '../hooks/useDeleteReview';
import { AUTHORIZED_USER } from '../graphql/queries';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    reviewContainer: {
        padding: 15,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    ratingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: theme.colors.primary,
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 20,
    },
    rating: {
        fontWeight: 'bold',
        fontSize: 20,
        color: theme.colors.primary,
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
    },
    reviewInfo: {
        flexDirection: 'column',
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
    },
    date: {
        color: theme.colors.textSecondary,
        marginBottom: 10,
    },
    buttonDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        width: '100%',
    },
    repoButtonContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.colors.primary,
        height: 60,
        borderRadius: 4,
        width: 'auto',
        margin: 10,
        padding: 10,
    },
    deleteButtonContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.colors.error,
        height: 60,
        borderRadius: 4,
        width: 'auto',
        margin: 10,
        padding: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});

const ReviewItem = ({ review, refetch }) => {
    const history = useHistory();
    const [deleteReview] = useDeleteReview();
    const handleViewRepo = () => {
        history.push(`/${review.repository.id}`);
    };
    const handleDeleteReview = () => {
        const remove = () => {
            try {
                deleteReview({ id: review.id });
                setTimeout(() => {
                    refetch();
                }, 0);
            } catch (err) {
                console.log(err.message);
            }
        };
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: remove,
                },
            ]
        );
    };
    const date = format(new Date(review.createdAt), 'MM/dd/yyyy');
    return (
        <View key={review.id} style={styles.reviewContainer}>
            <View style={styles.info}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{review.rating}</Text>
                </View>
                <View style={styles.reviewInfo}>
                    <Text style={styles.username}>{review.repository.id}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            <View style={styles.buttonDiv}>
                <Pressable onPress={handleViewRepo}>
                    <View style={styles.repoButtonContainer}>
                        <Text style={styles.buttonText}>View repository</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleDeleteReview}>
                    <View style={styles.deleteButtonContainer}>
                        <Text style={styles.buttonText}>Delete review</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { id } = useParams();
    const { data, refetch: _refetch } = useQuery(AUTHORIZED_USER, {
        variables: { id: id, includeReviews: true },
        fetchPolicy: 'cache-and-network',
    });

    if (!data) return null;
    const reviews = data
        ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => (
                <ReviewItem review={item} refetch={_refetch} />
            )}
            keyExtractor={(item) => item.repository.id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default MyReviews;

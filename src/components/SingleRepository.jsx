import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    header: {
        marginBottom: 10,
    },
    reviewContainer: {
        padding: 15,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row'
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
    reviewInfo: {
        flexDirection: 'column',
        flex: 1
    },
    username: {
        fontWeight: 'bold',
    },
    date: {
        color: theme.colors.textSecondary,
        marginBottom: 10,
    }
});

const RepositoryInfo = ({ repository }) => {
    return (
        <View style={styles.header}>
            <RepositoryItem item={repository} showButton />
        </View>
    );
};

const ReviewItem = ({ review }) => {
    const date = format(new Date(review.createdAt), 'MM/dd/yyyy');
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{review.rating}</Text>
            </View>
            <View style={styles.reviewInfo}>
                <Text style={styles.username}>{review.user.username}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, fetchMore } = useRepository({ id: id, first: 3});

    if (!repository) return null;

    const onEndReach = () => {
        fetchMore();
    };

    const reviews = repository
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <RepositoryInfo repository={repository} />
            )}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default SingleRepository;

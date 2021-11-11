import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
const _ = require('lodash');

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    picker: {
        height: 60,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.mainBackground,
        borderWidth: 0,
        fontWeight: 'bold',
    },
    searchBar: {
        margin: 15,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const selectedOrder = this.props.selectedOrder;
        const setSelectedOrder = this.props.setSelectedOrder;
        const searchQuery = this.props.searchQuery;
        const setSearchQuery = this.props.setSearchQuery;

        const debounced = _.debounce(setSearchQuery, 150, { maxWait: 1000 });
        const onChangeSearch = (query) => debounced(query);

        return (
            <View>
                <Searchbar
                    style={styles.searchBar}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <Picker
                    style={styles.picker}
                    selectedValue={selectedOrder}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedOrder(itemValue)
                    }
                >
                    <Picker.Item
                        label="Latest repositories"
                        value="CREATED_AT"
                    />
                    <Picker.Item
                        label="Highest rated repositories"
                        value="DESC"
                    />
                    <Picker.Item
                        label="Lowest rated repositories"
                        value="ASC"
                    />
                </Picker>
            </View>
        );
    };

    render() {
        const repositories = this.props.repositories;
        const history = this.props.history;
        const fetchMore = this.props.onEndReach;
        const onPress = (item) => {
            const id = item.fullName.replace('/', '.');
            history.push(`/${id}`);
        };
        const repositoryNodes = repositories
            ? repositories.edges.map((edge) => edge.node)
            : [];

        const onEndReach = () => {
            fetchMore();
        };
        return (
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={(item) => item.fullName}
                renderItem={({ item }) => (
                    <Pressable onPress={() => onPress(item)}>
                        <RepositoryItem item={item} />
                    </Pressable>
                )}
                ListHeaderComponent={this.renderHeader}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
        );
    }
}

const RepositoryList = () => {
    const [selectedOrder, setSelectedOrder] = useState('CREATED_AT');
    const [searchQuery, setSearchQuery] = useState('');
    const { repositories, fetchMore } = useRepositories({
        first: 8,
        selectedOrder,
        searchQuery,
    });

    const history = useHistory();

    return (
        <RepositoryListContainer
            repositories={repositories}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            history={history}
            onEndReach={fetchMore}
        />
    );
};

export default RepositoryList;

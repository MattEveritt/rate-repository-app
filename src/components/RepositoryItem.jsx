import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import * as Linking from 'expo-linking';

import PersonalInfoBox from './PersonalInfoBox';
import PopularityInfoBox from './PopularityInfoBox';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 'auto',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginVertical: 20
    },
    gitHubButtonContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.colors.primary,
        height: 60,
        borderRadius: 4,
        width: '150%',
        paddingHorizontal: 20
    },
    gitHubButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});

const RepositoryItem = ({ item, showButton }) => {
    return (
        <View style={styles.container}>
            <PersonalInfoBox item={item} />
            <PopularityInfoBox item={item} />
            {showButton ? (
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => Linking.openURL(item.url)}>
                        <View style={styles.gitHubButtonContainer}>
                            <Text style={styles.gitHubButton}>
                                Open in Github
                            </Text>
                        </View>
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
};
export default RepositoryItem;

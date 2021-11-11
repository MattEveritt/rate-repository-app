import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    // Replace the IP address part with your own IP address!
    uri: Constants.manifest.extra.apolloUri,
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                repositories: relayStylePagination(),
            },
        },
    },
    Repository: {
        fields: {
            reviews: relayStylePagination(),
        },
    },
});

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            const token = accessToken ? accessToken.substring(1, accessToken.length - 1) : '';
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${token}` : '',
                },
            };
        } catch (error) {
            console.log('error',error);
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
    });
};

export default createApolloClient;

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: Constants.manifest.extra.apolloUri,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      const token = accessToken.substring(1, accessToken.length - 1);
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${token}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
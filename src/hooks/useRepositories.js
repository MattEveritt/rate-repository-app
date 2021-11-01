import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (result.loading) return console.log('Loading');
  if (result.error) return console.log('error');

  const repositories = result.data.repositories

  return repositories;
};

export default useRepositories;

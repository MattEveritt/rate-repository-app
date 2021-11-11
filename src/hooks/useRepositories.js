import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ first, selectedOrder, searchQuery }) => {
    let variables;
    if (selectedOrder !== 'CREATED_AT') {
        variables = {
            orderBy: 'RATING_AVERAGE',
            orderDirection: selectedOrder,
            searchKeyword: searchQuery,
            first: first,
        };
    } else {
        variables = {
            orderBy: 'CREATED_AT',
            searchKeyword: searchQuery,
            first: first,
        };
    }

    const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
        variables: variables,
        fetchPolicy: 'cache-and-network',
    });

    const repositories = data?.repositories;

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repositories.pageInfo.hasNextPage;
        console.log(canFetchMore)
        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data?.repositories.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.repositories.edges;
                const pageInfo = fetchMoreResult.repositories.pageInfo;
                console.log(newEdges)
                return newEdges.length
                    ? {
                          repositories: {
                              __typename:
                                  previousResult.repositories.__typename,
                              edges: [
                                  ...previousResult.repositories.edges,
                                  ...newEdges,
                              ],
                              pageInfo,
                          },
                      }
                    : previousResult;
            },
        });
    };

    return { repositories, fetchMore: handleFetchMore };
};

export default useRepositories;

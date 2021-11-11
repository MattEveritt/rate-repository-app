import { useQuery } from '@apollo/client';

import { REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
    const { data, loading, fetchMore } = useQuery(REPOSITORY, {
        variables,
        fetchPolicy: 'cache-and-network',
    });

    const repository = data?.repository;
    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data?.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.repository.reviews.edges;
                const pageInfo = fetchMoreResult.repository.reviews.pageInfo;

                return newEdges.length
                    ? {
                          repository: {
                              ...previousResult.repository,
                              reviews: {
                                  __typename:
                                      previousResult.repository.reviews
                                          .__typename,
                                  edges: [
                                      ...previousResult.repository.reviews.edges,
                                      ...newEdges,
                                  ],
                                  pageInfo,
                              },
                          },
                      }
                    : previousResult;
            },
        });
    };
    return { repository, fetchMore: handleFetchMore };
};

export default useRepository;

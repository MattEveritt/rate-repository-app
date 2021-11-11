import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query Repositories(
        $first: Int
        $after: String
        $orderDirection: OrderDirection
        $orderBy: AllRepositoriesOrderBy
        $searchKeyword: String
    ) {
        repositories(
            first: $first
            after: $after
            orderDirection: $orderDirection
            orderBy: $orderBy
            searchKeyword: $searchKeyword
        ) {
            edges {
                node {
                    fullName
                    ratingAverage
                    reviewCount
                    stargazersCount
                    forksCount
                    ownerAvatarUrl
                    description
                    language
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;

export const AUTHORIZED_USER = gql`
    query getAuthorizedUser($includeReviews: Boolean = false) {
        authorizedUser {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        user {
                            username
                        }
                        repository {
                            id
                        }
                        rating
                        createdAt
                        text
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
`;

export const REPOSITORY = gql`
    query Repository($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            id
            fullName
            url
            ratingAverage
            reviewCount
            stargazersCount
            forksCount
            ownerAvatarUrl
            description
            language
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                        repository {
                            fullName
                        }
                        repositoryId
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
`;

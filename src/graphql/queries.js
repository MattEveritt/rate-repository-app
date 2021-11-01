import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
      }
    }
  }
`;

export const AUTHORIZE = gql`
mutation authorize($credentials: AuthorizeInput!) {
  authorize(credentials: $credentials) {
    accessToken
  }
}
`;

export const AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id
    username
  }
}
`

import gql from 'graphql-tag';

export const GET_POST = gql`
  query GetPost($rawId: Int) {
    post(rawId: $rawId) {
      id
      title
      body
      category {
        id
        name
      }
      tags {
        id
        name
      }
      createdAt
      createdBy {
        name
      }
      updatedAt
    }
  }
`;

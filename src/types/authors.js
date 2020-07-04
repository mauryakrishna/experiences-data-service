import { gql } from 'apollo-server-express';

const Authors = gql`
  type Author {
    uid: String!
    authorid: Int!
    displayname: String!
    email: String!
    shortintro: String!
    experiences: [Experience]
  }

  type SaveAuthorResponse {
    authoruid: String!
  }

  type UpdateAuthorResponse {
    updated: Boolean!
  }
`;

const AuthorsInput = gql`
  input SaveAuthorInput {
    displayname: String!
    email: String!
    shortintro: String!
  } 
  input UpdateAuthorInput {
    authoruid: String!
    displayname: String!
    shortintro: String!
  }
`;

export { Authors, AuthorsInput };
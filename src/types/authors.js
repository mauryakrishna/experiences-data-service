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
`;

const AuthorsInput = gql`
  input SaveAuthorsInput {
    displayname: String!
    email: String!
    shortintro: String!
  } 
`;
export { Authors, AuthorsInput };
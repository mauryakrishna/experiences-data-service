import { gql } from 'apollo-server-express';

const Authors = gql`
  type Author {
    id: ID!
    authorid: Int!
    displayname: String!
    email: String!
    shortintro: String!
  }
`;

export { Authors };
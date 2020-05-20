import { gql } from 'apollo-server-express';

const Authors = gql`
  type Author {
    id: ID!
    displayname: String!
    email: String!
    shortintro: String!
  }
`;

export { Authors };
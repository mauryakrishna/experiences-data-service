import { gql } from 'apollo-server-express';

const Thoughts = gql`
  type Thought {
    experienceslugkey: String!
    text: String!
    authordisplayname: String!
  }
`;
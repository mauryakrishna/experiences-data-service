import { gql } from 'apollo-server-express';

const exampletype = gql`
  type ExampleType {
    id: ID!
    examplename: String
  }
`;

export { exampletype };
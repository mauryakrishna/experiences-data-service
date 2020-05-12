import { makeExecutableSchema, gql } from 'apollo-server-express';
import { exampleupdate, examplequery } from './resolvers';
import types from './types';

const Query = gql`
  type Query {
    examplequery: ExampleType
  }
`;

const Mutation = gql`
  type Mutation {
    exampleupdate: ExampleType
  }
`;

const typeDefs = [Query, Mutation, ...Object.entries(types).map(e => e[1])];

const resolvers = {
  Query: {
    examplequery
  },
  Mutation: {
    exampleupdate
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


export default schema;
export { typeDefs };

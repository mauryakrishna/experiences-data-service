
import { makeExecutableSchema, gql } from 'apollo-server-express';
import { exampleupdate, examplequery, saveExperience } from './resolvers';
import types from './types';

const Query = gql`
  type Query {
    examplequery: ExampleType
    getexperience(slug: String!): Experience
  }
`;

const Mutation = gql`
  type Mutation {
    exampleupdate: ExampleType
    saveExperience(input: SaveExperienceInput): Experience
  }
`;

const typeDefs = [Query, Mutation, ...Object.entries(types).map(e => e[1])];

const resolvers = {
  Query: {
    examplequery
  },
  Mutation: {
    exampleupdate,
    saveExperience
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


export default schema;
export { typeDefs };

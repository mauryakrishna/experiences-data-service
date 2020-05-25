
import { makeExecutableSchema, gql } from 'apollo-server-express';
import { exampleupdate, examplequery, saveExperience, updateExperience, getExperience } from './resolvers';
import types from './types';

const Query = gql`
  type Query {
    examplequery: ExampleType
    getExperience(slug: String!): Experience
  }
`;

const Mutation = gql`
  type Mutation {
    exampleupdate: ExampleType
    saveExperience(input: SaveExperienceInput): SaveExperienceResponse
    updateExperience(input: UpdateExperienceInput): UpdateExperienceResponse
  }
`;

const typeDefs = [Query, Mutation, ...Object.entries(types).map(e => e[1])];

const resolvers = {
  Query: {
    examplequery,
    getExperience
  },
  Mutation: {
    exampleupdate,
    saveExperience,
    updateExperience
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


export default schema;
export { typeDefs };

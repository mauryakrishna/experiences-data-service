
import { makeExecutableSchema, gql } from 'apollo-server-express';
import { exampleupdate, examplequery, saveExperience, updateExperience, getExperiences, getAnExperience, saveTitle, updateTitle } from './resolvers';
import types from './types';

const Query = gql`
  type Query {
    examplequery: ExampleType
    getExperiences: [Experience]
    getAnExperience(slug: String!): Experience
  }
`;

const Mutation = gql`
  type Mutation {
    exampleupdate: ExampleType
    saveExperience(input: SaveExperienceInput): SaveExperienceResponse
    updateExperience(input: UpdateExperienceInput): UpdateExperienceResponse
    saveTitle(input: SaveTitleInput): SaveExperienceResponse
    updateTitle(input: UpdateTitleInput): UpdateExperienceResponse
  }
`;

const typeDefs = [Query, Mutation, ...Object.entries(types).map(e => e[1])];

const resolvers = {
  Query: {
    examplequery,
    getExperiences,
    getAnExperience
  },
  Mutation: {
    exampleupdate,
    saveExperience,
    updateExperience,
    saveTitle,
    updateTitle
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


export default schema;
export { typeDefs };

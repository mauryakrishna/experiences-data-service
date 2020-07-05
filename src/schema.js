
import { makeExecutableSchema, gql } from 'apollo-server-express';
import {
  exampleupdate, examplequery,
  saveExperience, updateExperience, getExperiences, getAnExperience, saveTitle, updateTitle, publishExperience,
  getAuthor, saveAuthor, updateAuthor
} from './resolvers';
import types from './types';

const Query = gql`
  type Query {
    examplequery: ExampleType
    getExperiences: [Experience]
    getAnExperience(slugkey: String!): Experience
    getAuthor(uid: String!): Author
  }
`;

const Mutation = gql`
  type Mutation {
    exampleupdate: ExampleType
    saveExperience(input: SaveExperienceInput): SaveExperienceResponse
    updateExperience(input: UpdateExperienceInput): UpdateExperienceResponse
    publishExperience(input: PublishExperienceInput): PublishExperience
    saveTitle(input: SaveTitleInput): SaveExperienceResponse
    updateTitle(input: UpdateTitleInput): UpdateExperienceResponse
    saveAuthor(input: SaveAuthorInput): SaveAuthorResponse
    updateAuthor(input: UpdateAuthorInput): UpdateAuthorResponse
  }
`;

const typeDefs = [Query, Mutation, ...Object.entries(types).map(e => e[1])];

const resolvers = {
  Query: {
    examplequery,
    getExperiences,
    getAnExperience,
    getAuthor
  },
  Mutation: {
    exampleupdate,
    saveExperience,
    updateExperience,
    publishExperience,
    saveTitle,
    updateTitle,
    saveAuthor,
    updateAuthor
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


export default schema;
export { typeDefs };

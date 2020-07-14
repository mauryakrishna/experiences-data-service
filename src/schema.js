
import { makeExecutableSchema, gql } from 'apollo-server-express';
import {
  exampleupdate, examplequery,
  saveExperience, getExperiences, getAnExperience, saveTitle, publishExperience,
  saveNPublishExperience,
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
    publishExperience(input: PublishExperienceInput): PublishExperienceResponse
    saveNPublishExperience(input: SaveNPublishExperienceInput): PublishExperienceResponse

    saveTitle(input: SaveTitleInput): SaveTitleResponse

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
    publishExperience,
    saveNPublishExperience,
    saveTitle,
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

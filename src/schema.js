
import { makeExecutableSchema, gql } from 'apollo-server-express';
import {
  exampleupdate, examplequery,
  saveExperience, getExperiences, getAnExperienceForRead, getAnExperienceForEdit, saveTitle, publishExperience,
  saveNPublishExperience, deleteAnExperience,
  getAuthor, buttonPressRegister, signupAuthor, signinAuthor, updateAuthor, refreshUserToken,
  verifyMe, resendVerificationLink,
  saveNewThought, getThoughtsOfExperience, deleteAThought,
} from './resolvers';

import forgotPassword from './resolvers/forgotpassword';
import resetPassword from './resolvers/resetpassword';
import verifyEmail from './resolvers/verifyemail';

import types from './types';

const Query = gql`
  type Query {
    examplequery: ExampleType
    verifyMe: VerifyMeResponse
    getExperiences(cursor: String, experienceperpage: Int!): GetExperiencesResponse
    getAnExperienceForRead(slugkey: String!): ExperienceResult
    getAnExperienceForEdit(slugkey: String): EditExperience
    getAuthor(cursor: String, experienceperpage: Int!, uid: String!): GetAuthorResponse
    signinAuthor(email: String!, password: String!): SignAuthorResponse
    getThoughtsOfExperience(cursor: String, experienceslugkey: String!): GetThoughtsOfExperienceResponse
  }
`;

const Mutation = gql`
  type Mutation {
    exampleupdate: ExampleType
    saveExperience(input: SaveExperienceInput): SaveExperienceResponse
    publishExperience(input: PublishExperienceInput): PublishExperienceResponse
    saveNPublishExperience(input: SaveNPublishExperienceInput): PublishExperienceResponse
    deleteAnExperience(input: DeleteExperienceInput): DeleteExperienceResponse
    saveTitle(input: SaveTitleInput): SaveTitleResponse
    refreshUserToken(uid: String!): RefreshUserTokenResponse
    verifyEmail(input: VerifyEmailInput): VerifyEmailResponse
    resendVerificationLink(email: String!): ResendVerificaionLinkResponse
    signupAuthor(input: SignupAuthorInput): SignAuthorResponse
    forgotPassword(input: ForgotPasswordInput) : ForgotPasswordResponse
    resetPassword(input: ResetPasswordInput): ResetPasswordResponse
    buttonPressRegister: SignAuthorResponse
    updateAuthor(input: UpdateAuthorInput): UpdateAuthorResponse
    saveNewThought(input: SaveNewThoughtInput): SaveNewThoughtResponse
    deleteAThought(input: DeleteAThoughtInput): DeleteAThoughtResponse
  }
`;

const typeDefs = [Query, Mutation, ...Object.entries(types).map(e => e[1])];

const resolvers = {
  Query: {
    examplequery,
    verifyMe,
    getExperiences,
    getAnExperienceForRead,
    getAnExperienceForEdit,
    getAuthor,
    signinAuthor,
    getThoughtsOfExperience
  },
  Mutation: {
    exampleupdate,
    saveExperience,
    publishExperience,
    saveNPublishExperience,
    deleteAnExperience,
    saveTitle,
    buttonPressRegister,
    refreshUserToken,
    signupAuthor,
    updateAuthor,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationLink,
    saveNewThought,
    deleteAThought
  },
  ExperienceResult: {
    __resolveType: (experience) => { 
      return experience.__typename;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


export default schema;
export { typeDefs };

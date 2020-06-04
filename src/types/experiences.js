import { gql } from 'apollo-server-express';

const Experiences = gql`
  type Experience {
    id: ID!
    author: String!
    authorid: Int
    title: String!
    subtitle: String
    experience: String!
    readcount: Int
    publishdate: String
  }

  type SaveExperienceResponse {
    id: Int!
  }

  type UpdateExperienceResponse {
    updated: Boolean!
  }
`;

const ExperiencesInput = gql`
  input SaveExperienceInput {
    authorid: Int!
    experience: String!
  }

  input UpdateExperienceInput {
    id: Int!
    experience: String!
  }

  input SaveTitleInput {
    authorid: Int!
    title: String!
  }

  input UpdateTitleInput {
    id: Int!
    title: String!
  }
`;

export { Experiences, ExperiencesInput };
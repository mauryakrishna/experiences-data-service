import { gql } from 'apollo-server-express';

const Experiences = gql`
  type Experience {
    id: ID!
    authoruid: String!
    author: Author
    title: String!
    subtitle: String
    experience: JSONObject!
    slug: String
    slugkey: String
    readcount: Int
    ispublished: Boolean
    publishdate: String
  }

  type SaveTitleResponse {
    title: String!
    id: ID!
  }

  type UpdateTitleResponse {
    title: String!
    updated: Boolean!
  }

  type SaveExperienceResponse {
    experience: JSONObject!
    id: ID!
  }

  type UpdateExperienceResponse {
    experience: JSONObject!
    updated: Boolean!
  }

  type PublishExperienceResponse {
    slug: String!
    slugkey: String!
    published: Boolean!
  }
`;

const ExperiencesInput = gql`

  input SaveExperienceInput {
    authoruid: String!
    experience: JSONObject!
  }

  input UpdateExperienceInput {
    id: ID!
    experience: JSONObject!
  }

  input SaveTitleInput {
    authoruid: String!
    title: String!
  }

  input UpdateTitleInput {
    id: ID!
    title: String!
  }

  input PublishExperienceInput {
    id: ID!
    authoruid: String!
  }

  input SaveNPublishExperienceInput {
    id: ID!
    title: String!
    experience: JSONObject!
    authoruid: String!
  }
`;

export { Experiences, ExperiencesInput };
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

  type SaveExperienceResponse {
    id: Int!
  }

  type UpdateExperienceResponse {
    updated: Boolean!
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
`;

export { Experiences, ExperiencesInput };
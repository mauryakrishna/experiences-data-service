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
    slugkey: String!
    saved: Boolean!
  }

  type SaveExperienceResponse {
    experience: JSONObject!
    slugkey: String!
    authoruid: String!
  }

  type PublishExperienceResponse {
    slug: String!
    published: Boolean!
  }
`;

const ExperiencesInput = gql`

  input SaveExperienceInput {
    authoruid: String!
    slugkey: String
    experience: JSONObject!
  }

  input SaveTitleInput {
    authoruid: String!
    slugkey: String
    title: String!
  }

  input PublishExperienceInput {
    slugkey: String
    authoruid: String!
  }

  input SaveNPublishExperienceInput {
    slugkey: String
    title: String!
    experience: JSONObject!
    authoruid: String!
  }
`;

export { Experiences, ExperiencesInput };
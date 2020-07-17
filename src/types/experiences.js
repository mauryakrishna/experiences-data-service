import { gql } from 'apollo-server-express';

const Experiences = gql`
  type Experience {
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

  type GetExperiencesResponse {
    cursor: String!
    experiences: [Experience!] 
  }
  type SaveTitleResponse {
    title: String!
    slugkey: String!
    saved: Boolean!
  }

  type EditExperience {
    title: String
    experience: JSONObject
    ispublished: Boolean
  }

  type SaveExperienceResponse {
    experience: JSONObject!
    slugkey: String!
    saved: Boolean!
  }

  type PublishExperienceResponse {
    slug: String
    slugkey: String
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
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
    created_at: Date
  }

  type ExperienceNotFound {
    experiencefound: Boolean
  }

  union ExperienceResult = Experience | ExperienceNotFound

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

  type DeleteExperienceResponse {
    deleted: Boolean!
  }
`;

const ExperiencesInput = gql`

  input SaveExperienceInput {
    slugkey: String
    experience: JSONObject!
  }

  input SaveTitleInput {
    slugkey: String
    title: String!
  }

  input PublishExperienceInput {
    slugkey: String
  }

  input SaveNPublishExperienceInput {
    slugkey: String
    title: String!
    experience: JSONObject!
  }

  input DeleteExperienceInput {
    slugkey: String!
    authoruid: String!
  }
`;

export { Experiences, ExperiencesInput };
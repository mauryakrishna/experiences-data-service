import { gql } from 'apollo-server-express';

const Experiences = gql`
  type Experience {
    authoruid: String!
    author: Author
    title: String!
    subtitle: String
    experience: JSONObject!
    experienceintrotext: String
    thoughtsenabled: Boolean!
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

  type EditExperience {
    title: String
    experience: JSONObject
    ispublished: Boolean
  }

  type SaveExperienceResponse {
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
    slugkey: String
  }
`;

const ExperiencesInput = gql`

  input SaveExperienceInput {
    slugkey: String
    title: String
    experience: JSONObject
  }

  input PublishExperienceInput {
    slugkey: String
    enablethoughts: Boolean
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
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
`;

const ExperiencesInput = gql`
  input SaveExperienceInput {
    authorid: Int!
    title: String!
    subtitle: String
    experience: String!
    tags: String
  }
`;
export { Experiences, ExperiencesInput };
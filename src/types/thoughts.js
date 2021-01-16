import { gql } from 'apollo-server-express';

const Thoughts = gql`
  type Thought {
    thoughtid: Int!,
    experienceslugkey: String!
    thought: JSONObject!
    thoughtauthor: Author
    created_at: Date
  }

  type GetThoughtsOfExperienceResponse {
    cursor: String!
    thoughts: [Thought]!
  }

  type SaveNewThoughtResponse {
    saved: Boolean!
    thoughtid: Int
  }

  type DeleteAThoughtResponse {
    deleted: Boolean!
    thoughtid: Int
  }
`;

const ThoughtsInput = gql`
  input SaveNewThoughtInput {
    experienceslugkey: String!
    thought: JSONObject!
    thoughtauthoruid: String!
  }

  input DeleteAThoughtInput {
    experienceslugkey: String!
    thoughtauthoruid: String!
    thoughtid: Int!
  }
`;

export { Thoughts, ThoughtsInput };
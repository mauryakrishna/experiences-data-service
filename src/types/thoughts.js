import { gql } from 'apollo-server-express';

const Thoughts = gql`
  type Thought {
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
  }

  type DeleteAThoughtResponse {
    deleted: Boolean!
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
  }
`;

export { Thoughts, ThoughtsInput };
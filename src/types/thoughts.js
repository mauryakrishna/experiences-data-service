import { gql } from 'apollo-server-express';

const Thoughts = gql`
  type Thought {
    experienceslugkey: String!
    thought: JSONObject!
    thoughtauthor: Author
    created_at: Date
  }

  type GetThoughtsOfExperienceResponse {
    thoughts: [thought]!
  }

  type SaveNewThoughtResponse {
    saved: boolean!
  }

  type DeleteAThoughtResponse {
    deleted: boolean!
  }
`;

const ThoughtsInput = gql`
  input SaveNewThoughtInput {
    experienceslugkey: STring!
    thought: JSONObject!
    thoughtauthoruid: String!
  }

  input DeleteAThought {
    experienceslugkey: String!
    thoughtauthoruid: String!
  }
`;
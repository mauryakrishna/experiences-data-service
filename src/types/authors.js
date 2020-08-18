import { gql } from 'apollo-server-express';

const Authors = gql`
  type Author {
    id: Int!
    uid: String!
    displayname: String!
    email: String!
    shortintro: String!
    experiences: [Experience]
  }
  
  type VerifyMeResponse {
    valid: Boolean!
    displayname: String
    authoruid: String
  }
  type AuthorBioResponse {
    displayname: String
    authoruid: String
  }
  
  type GetAuthorResponse {
    cursor: String!
    author: Author!
  }

  type SignAuthorResponse {
    exist: Boolean!
    author: AuthorBioResponse
  }

  type UpdateAuthorResponse {
    updated: Boolean!
  }
`;

const AuthorsInput = gql`
  input SigninAuthorInput {
    email: String!
  }

  input SignupAuthorInput {
    displayname: String!
    email: String!
    facebookid: Int
  } 

  input UpdateAuthorInput {
    authoruid: String!
    displayname: String!
    shortintro: String!
  }
`;

export { Authors, AuthorsInput };
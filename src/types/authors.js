import { gql } from 'apollo-server-express';

const Authors = gql`
  type Author {
    uid: String!
    displayname: String!
    email: String!
    shortintro: String
    region: String
    languages: String    
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
    region: String
    languages: String
  }
  
  type GetAuthorResponse {
    cursor: String!
    author: Author!
  }

  type SignAuthorResponse {
    exist: Boolean!
    author: AuthorBioResponse
    token: String
    message: String
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
    email: String!
    displayname: String!
    password: String!
    region: String!
    languages: String!
    shortintro: String
  } 

  input UpdateAuthorInput {
    authoruid: String!
    displayname: String!
    shortintro: String
    region: String!
    languages: String!
  }
`;

export { Authors, AuthorsInput };
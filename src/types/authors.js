import { gql } from 'apollo-server-express';

const Authors = gql`
  type Author {
    uid: String!
    displayname: String!
    email: String!
    shortintro: String
    experienceintrotext: String
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
    verificationkey: String
    isemailverified: Boolean
  }

  type UpdateAuthorResponse {
    updated: Boolean!
  }

  type ForgotPasswordResponse {
    emailsent: Boolean
    userexist: Boolean
    isemailverified: Boolean
  } 

  type ResetPasswordResponse {
    passwordupdated: Boolean!
    requestexpired: Boolean
  }

  type VerifyEmailResponse {
    verifysuccess: Boolean
    isemailverified: Boolean
    requestvalid: Boolean
  }

  type ResendVerificaionLinkResponse {
    resendsuccess: Boolean
  }

  type RefreshUserTokenResponse {
    token: String
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
  }

  input ForgotPasswordInput {
    email: String!
  }

  input ResetPasswordInput {
    resetrequestkey: String!
    newpassword: String!
  }

  input VerifyEmailInput {
    verifykey: String!
  }
`;

export { Authors, AuthorsInput };
import { gql } from 'apollo-server-express';

export const isodatetime = gql`
  scalar Date
  scalar Time
  scalar DateTime
`;
import * as exampletype from './exampletype';
import * as Authors from './authors';
import * as Experiences from './experiences';
import * as JsonType from './jsontype';

const typeDefs = {
  ...JsonType,
  ...exampletype,
  ...Authors,
  ...Experiences
};

export default typeDefs;

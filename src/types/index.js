import * as exampletype from './exampletype';
import * as Authors from './authors';
import * as Experiences from './experiences';

const typeDefs = {
  ...exampletype,
  ...Authors,
  ...Experiences
};

export default typeDefs;

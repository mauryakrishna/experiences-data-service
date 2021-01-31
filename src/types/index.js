import * as exampletype from './exampletype';
import * as Authors from './authors';
import * as Experiences from './experiences';
import * as JsonType from './jsontype';
import * as IsoDatetime from './isodatetime';
import * as Thoughts from './thoughts';

const typeDefs = {
  ...JsonType,
  ...IsoDatetime,
  ...exampletype,
  ...Authors,
  ...Experiences,
  ...Thoughts
};

export default typeDefs;

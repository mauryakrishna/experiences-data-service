import * as exampletype from './exampletype';
import * as Authors from './authors';
import * as Experiences from './experiences';
import * as JsonType from './jsontype';
import * as IsoDatetime from './isodatetime';

const typeDefs = {
  ...JsonType,
  ...IsoDatetime,
  ...exampletype,
  ...Authors,
  ...Experiences
};

export default typeDefs;

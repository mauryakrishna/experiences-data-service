if (process.env.NODE_ENV == 'development') {
  require('env2')('./devenv.json');
}
else {
  require('env2')('./prodenv.json');
}
// Beneficial in saving time on production
console.log(`Loaded environment is ${process.env.NODE_ENV}`);

import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import { applyMiddleware } from 'graphql-middleware';
import jwt from 'jsonwebtoken';

import middlewares from './src/middlewares/index';
const app = express();

app.use(cookieParser());

// using console for logging
global.logger = console;

// do not change below line to import statement there can problem
const schema = require('./src/schema.js').default;

const requestlogging = {
  requestDidStart(requestContext) {
    console.log('Request', requestContext.query);
  }
}

const schemaWithMiddleware = applyMiddleware(schema, ...middlewares);

const context = ({ req, res }) => {
  const token = req.headers.authorization;
  if (token) {
    try { 
      const userAuthData = jwt.verify(token, process.env.JWT_SECRET);
      userAuthData.req = req;
      userAuthData.res = res;
      return userAuthData;
    } catch (e) {
      // do not make a round trip of responding with 401 and then client making the refreshUserToken request
      // instead when JWT expired, renew the access token from here
      throw new AuthenticationError('Un-authorized');
    }
  }
  return {req, res};
}

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context,
  plugins: [],//requestlogging
  formatError: (err) => {
    if(err instanceof AuthenticationError) {
      return { StatusCode: 401 };
    }
    return err;
  },
  onHealthCheck: () => {
    return new Promise((resolve, reject) => {
      // Replace the `true` in this conditional with more specific checks!
      if (true) {
        resolve();
      } else {
        reject();
      }
    });
  }
});

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (
      origin === undefined ||
      origin === 'http://localhost:4000' ||
      origin === 'http://localhost:3000' ||
      origin === process.env.APP_URL
    ) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`));
    }
  }
}

const { NODE_ENV, PORT } = process.env;

// GraphiQL, a visual editor for queries
if (NODE_ENV !== 'production') {
  app.use('/playground', expressPlayground({
    playground: true,
    endpoint: '/',
    settings: {
      'editor.theme': 'light',
      'request.credentials': 'include', // Tell it to pass cookies so we can use the playground on staging }));
    }
  }))
}

// Add env variables to the server
app.env = {
  NODE_ENV,
  PORT
};

server.applyMiddleware({ app, cors: corsOptions, path: '/gql' });

app.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  console.log(`Running server at http://localhost:${PORT} in ${NODE_ENV}`);
});

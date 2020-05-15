import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';

import config from './config';
import schema from './schema';

const app = express();
const conf = config();

// Get config for server setup
const { environment, port, proxies } = conf;

const server = new ApolloServer({ schema });

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (
      origin === undefined ||
      origin === 'http://localhost:4000' ||
      origin === 'http://localhost:3000'
    ) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`));
    }
  }
}

// GraphiQL, a visual editor for queries
if (environment !== 'production') {
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
  environment,
  port
};

server.applyMiddleware({ app, cors: corsOptions, path: '/gql' });

app.listen(port, '0.0.0.0', err => {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  console.log(`Running server at http://localhost:${port} in ${environment}`);
});

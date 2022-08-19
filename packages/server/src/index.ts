// expose a simple GraphQL server with a simple schema to test how our server works

import express, { Application } from 'express';
import { ApolloServer, Config, gql } from 'apollo-server-express';
import { IResolvers } from '@graphql-tools/utils';

const PORT = 8080;

// type definition
const typeDefs = gql`
    type Query {
        message: String!
    }
`;


// resolver
const resolvers: IResolvers = {
    Query: {
      message: () => 'It works!'
    }
};

const app: Application = express();
const config: Config = {
    typeDefs: typeDefs,
    resolvers: resolvers
};

app.get('/', (req, res) =>
    res.send('Express is successfully running!'));

async function startApolloServer(config: Config) {
    
    const app: Application = express();
    const server: ApolloServer = new ApolloServer(config);
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql'
    });
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}


startApolloServer(config);


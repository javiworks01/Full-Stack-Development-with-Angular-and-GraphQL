// expose a simple GraphQL server with a simple schema to test how our server works

import express, { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { IResolvers } from '@graphql-tools/utils';
import schema from './graphql/schema';



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



async function startApolloServer() {
    
    const app: Application = express();
    const server: ApolloServer = new ApolloServer({ schema });
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql'
    });
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}


startApolloServer();


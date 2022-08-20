// expose a simple GraphQL server with a simple schema to test how our server works

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import casual from 'casual';  // fake data generator






async function startApolloServer() {
    
    const PORT = 8080;
    const app: Application = express();
    const server: ApolloServer = new ApolloServer({ schema, mocks: true });
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


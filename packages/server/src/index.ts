// expose a simple GraphQL server with a simple schema to test how our server works

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import casual from 'casual';  // fake data generator


// mocking graphql api with casual
const mocks = {
    User: () => ({
      id: casual.uuid,
      fullName: casual.full_name,
      bio: casual.text,
      email: casual.email,
      username: casual.username,
      password: casual.password,
      image: 'https://picsum.photos/seed/picsum/150/150',
      coverImage: 'https://picsum.photos/seed/picsum/600/300',
      postsCount: () => casual.integer(0)
    }),

    Post: () => ({
      id: casual.uuid,
      text: casual.text,
      image: 'https://picsum.photos/seed/picsum/350/350',
      commentsCount: () => casual.integer(0,100),
      likesCount: () => casual.integer(0,100),
      latestLike: casual.first_name,
      likedByAuthUser: casual.boolean,
      createdAt: () => casual.date()
    }),
    
    Comment: () => ({
      id: casual.uuid,
      comment: casual.text,
      post: casual.uuid,
      createdAt: () => casual.date()
    }),
    
    Like: () => ({
      id: casual.uuid,
      user: casual.uuid,
      post: casual.uuid
    }),
    
    Query: () =>({
      getPostsByUserId: () =>  [...new Array(casual.integer(10, 100))],
      getFeed: () => [...new Array(casual.integer(10, 100))],
      getNotificationsByUserId: () => [...new Array(casual.integer(10, 100))],
      getCommentsByPostId: () => [...new Array(casual.integer(10, 100))],
      getLikesByPostId: () => [...new Array(casual.integer(10, 100))],
      searchUsers: () => [...new Array(casual.integer(10, 100))]
    })
  
  };




async function startApolloServer() {
    
    const PORT = 8080;
    const app: Application = express();
    const server: ApolloServer = new ApolloServer({ schema, mocks, mockEntireSchema: false });
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


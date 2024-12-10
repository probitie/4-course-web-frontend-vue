import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache(),
});

export default client;


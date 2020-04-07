import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

const httpLink = new HttpLink({ uri: process.env.BLOG_BACKEND_URL, fetch: fetch });
const cache = new InMemoryCache();
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const link = ApolloLink.from([errorLink, httpLink]);
export const client = new ApolloClient({ link, cache });

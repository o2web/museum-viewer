import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import introspectionQueryResultData from './tasks/fragment-types.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });
const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL, fetch });

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;

import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import introspectionQueryResultData from './tasks/fragment-types.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });
const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL, fetch });

const authMiddleware = new ApolloLink((operation, forward) => {
  // forward operation for SSR rendering
  if (!window) return forward(operation);

  // add the authorization to the headers
  const authorization = localStorage.getItem('Authorization');
  const expires = localStorage.getItem('Expires');
  const refreshToken = localStorage.getItem('RefreshToken');

  if (authorization) {
    const headers = {
      Authorization: authorization,
    };

    // set refresh token if token is expired and refresh token exists
    if (expires && new Date(expires * 1000) <= new Date()) {
      if (refreshToken) {
        headers.RefreshToken = refreshToken;
      }
    }

    operation.setContext({ headers });
  }

  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) => (
  forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    // update token after query
    if (headers) {
      ['Authorization', 'Expires', 'RefreshToken'].forEach((key) => {
        const header = headers.get(key);
        if (header) {
          localStorage.setItem(key, header);
        }
      });
    }

    return response;
  })
));

const client = new ApolloClient({
  link: afterwareLink.concat(concat(authMiddleware, httpLink)),
  cache,
});

export default client;

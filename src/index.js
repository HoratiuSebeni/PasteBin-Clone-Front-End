import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './components/home';

const serverUrl = 'http://localhost:3000';

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root'));
root.render(<ApolloProvider client={client}><Home /></ApolloProvider>);

export default serverUrl;
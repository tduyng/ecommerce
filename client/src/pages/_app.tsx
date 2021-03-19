import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import React from 'react';
import { useApollo } from 'src/utils/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import React from 'react';
import { useApollo } from 'src/utils/apollo';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: '1.6rem' },
        }}
      />
    </ApolloProvider>
  );
}

export default MyApp;

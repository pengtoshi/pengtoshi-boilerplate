import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { AuthProvider, useGraphqlClient } from "@libs/graphql-next";
import { ThemeProvider, Toaster } from "@libs/ui-web";
import "../../public/globals-client.css";

const App = ({ Component, pageProps }: AppProps) => {
  const client = useGraphqlClient();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <Toaster />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;

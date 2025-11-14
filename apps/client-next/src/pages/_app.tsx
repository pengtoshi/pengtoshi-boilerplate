import type { AppProps } from "next/app";
import { ThemeProvider, Toaster } from "@libs/ui";
import "../../public/globals-client.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Toaster />
      <Component {...pageProps} />;
    </ThemeProvider>
  );
};

export default App;

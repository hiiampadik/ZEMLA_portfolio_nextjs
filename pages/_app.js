import "../styles/globals.scss";
import { ThemeProvider } from "next-themes";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Petr Žemla</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Petr Žemla, Photographer, Fotograf, Programování, Programming, Creative, Photo, Prague, Zkrat Kolektiv, Zkrat, Zkrat Col., Zkrat Collective, Zkrat.PDF, Zkrat PDF, Portfolio"
        />
        <meta
          name="description"
          content="Petr Žemla's Portfolio. Photographer based in Prague, Czech Republic"
        />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

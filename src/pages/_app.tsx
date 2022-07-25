import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { OrgaProvider } from "@orgajs/react";

import "@fontsource/victor-mono";
import "@fontsource/material-icons";
import { resetGlobalCss } from "../theme.config";

function MyApp({ Component, pageProps }: AppProps) {
  resetGlobalCss();
  return (
    <OrgaProvider>
      <Component {...pageProps} />
    </OrgaProvider>
  );
}

export default MyApp;

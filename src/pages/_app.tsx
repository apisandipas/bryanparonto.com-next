import React from "react";
import type { AppProps } from "next/app";
import { OrgaProvider } from "@orgajs/react";

import "victormono";
import "nerdfonts-web"
import "@fontsource/material-icons";
import { resetGlobalCss, styled } from "../theme.config";
import "highlight.js/styles/atom-one-dark.css";

const Code = styled("code", {
  backgroundColor: "pink",
});

const components = {
  code: Code,
};

function MyApp({ Component, pageProps }: AppProps) {
  resetGlobalCss();
  return (
    <OrgaProvider components={components}>
      <Component {...pageProps} />
    </OrgaProvider>
  );
}

export default MyApp;

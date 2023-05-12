import React from "react";
import { resetGlobalCss, styled } from "../theme.config";
// import { useAnalytics } from "../lib/useAnalytics";

import "victormono";
import "nerdfonts-web";
import "@fontsource/material-icons";
import "../one-dark-prism.css";

function MyApp({ Component, pageProps }) {
  resetGlobalCss();
  return <Component {...pageProps} />;
}

export default MyApp;

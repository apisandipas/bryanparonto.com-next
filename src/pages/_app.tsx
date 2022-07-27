import React from "react";
import type { AppProps } from "next/app";
import { resetGlobalCss, styled } from "../theme.config";
import "victormono";
import "nerdfonts-web";
import "@fontsource/material-icons";
import "highlight.js/styles/atom-one-dark.css";

function MyApp({ Component, pageProps }: AppProps) {
  resetGlobalCss();
  return <Component {...pageProps} />;
}

export default MyApp;

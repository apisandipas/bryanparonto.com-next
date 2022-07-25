import React from "react";
import Head from "next/head";
import { Container } from "../base";
import { Header, HEADER_HEIGHT } from "../Header";

const Layout = ({ title, date, author, email, size = 2, children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Bryan Paronto | Software Engineer & Technologist</title>
        <link rel="canonical" href="https://bryanparonto.com/" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/base16/onedark.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css"
        />
      </Head>
      <Header />
      <Container
        size={size}
        style={{
          paddingTop: HEADER_HEIGHT * 1.3,
          paddingBottom: HEADER_HEIGHT,
        }}
      >
        {children}
      </Container>
      <footer>
        <Container
          css={{
            my: "$6",
            textAlign: "center",
          }}
          size={3}
        >
          &copy; {new Date().getFullYear()} by Bryan Paronto. Powered by{" "}
          <a href="https://orgmode.org/" target="_blank" rel="noreferrer">
            org-mode
          </a>
          , using{" "}
          <a href="https://orga.js.org/" target="_blank" rel="noreferrer">
            orgajs
          </a>{" "}
          and{" "}
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            NextJS
          </a>
        </Container>
      </footer>
      <script src="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.js"></script>
    </>
  );
};

export default Layout;

import React, { useEffect, FC } from "react";
import Head from "next/head";
import { Container } from "../base";
import { Header, HEADER_HEIGHT } from "../Header";

type LayoutProps = {
  size?: any;
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ size = "2", children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Bryan Paronto | Software Engineer & Technologist</title>
        <link rel="canonical" href="https://bryanparonto.com/" />
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
            py: "$6",
            textAlign: "center",
          }}
          size={3}
        >
          &copy; {new Date().getFullYear()} by Bryan Paronto. Powered by{" "}
          <a href="https://orgmode.org/" target="_blank" rel="noreferrer">
            org-mode
          </a>
          , using{" "}
          <a
            href="https://github.com/rasendubi/uniorg"
            target="_blank"
            rel="noreferrer"
          >
            uniorg
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
    </>
  );
};

export default Layout;

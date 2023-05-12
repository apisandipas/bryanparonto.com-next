import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/Layout";
import { getPostBySlug, getPostSlugs } from "../../lib/api";
import { styled } from "../../theme.config";
import { Taglist } from "../../components/base";

const PostMeta = styled("div", {
  display: "flex",
  mb: "$8",
});

const PostAttribution = styled("div", {
  color: "$odWhite",
  display: "flex",
  p: "$4",
  mt: "$8",
  borderRadius: "$xl",
  background: "$odBlack",
  "> a": {
    color: "$odMagenta",
  },
  "> img": {
    marginRight: "1rem",
  },
});

export default function Post(post) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const content = post?.content
    .replace(/h1/gi, "h2")
    .replace(/emacs-lisp/g, "lisp");

  return (
    <Layout>
      <h1>{post.title}</h1>
      <PostMeta>
        <small>{post.date} by Bryan Paronto</small>

        <Taglist tags={post.tags} />
      </PostMeta>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PostAttribution>
        <img src="/me.jpg" width={100} />
        <div>
          <strong>Bryan Paronto</strong> is a software engineer and all around
          technology nerd living in Chicago with his girlfriend and their 2
          cats. He can be found here blogging or over on{" "}
          <Link href="http://twitch.tv/cablecardigital">Twitch</Link> talking to
          himself while he codes.
        </div>
      </PostAttribution>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

/* Return a list of possible value for id */
export function getStaticPaths() {
  const slugs = getPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

// Fetch necessary data for the blog post using params.id

export function getStaticProps({ params: { slug } }: Params) {
  const post = getPostBySlug(slug, ["title", "content", "slug"]);
  return {
    props: post,
  };
}

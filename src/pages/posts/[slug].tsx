import React from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/Layout";
import { getPostBySlug, getPostSlugs } from "../../lib/api";
import { styled } from "../../theme.config";
import {  Taglist }from "../../components/base"

const PostMeta = styled("div", {
  display: "flex",
  mb: "$8"
});

const PostAttribution = styled("div", {
  color: '$odWhite',
  p: '$4',
  mt: "$8",
  background: "$odBlack",
  "> a": {
    color: "$odMagenta"
  }
})

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
      <h1>{post.frontmatter.title}</h1>
      <PostMeta>
        <small>{post.frontmatter.date} by Bryan Paronto</small>

              <Taglist tags={post.frontmatter.tags} />
      </PostMeta>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PostAttribution>
        Bryan Paronto is a software engineer and all around technology nerd
        living in Chicago with his girlfriend and their 3 cats. He can be found here, bloggin or over on{" "}
        <Link href="http://twitch.tv/cablecardigital">Twitch</Link> talking to himself while he codes.
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
export async function getStaticPaths() {
  const slugs = await getPostSlugs();

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

export async function getStaticProps({ params: { slug } }: Params) {
  const post = await getPostBySlug(slug, ["frontmatter", "content"]);
  return {
    props: post,
  };
}

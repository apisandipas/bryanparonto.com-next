import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import { styled } from "../theme.config";
import { Taglist } from "../components/base";

const PostPreview = styled("div", {
  mb: "$4",
  mx: "$4",
});

const PostTitle = styled("header", {
  display: "flex",
  width: "100%",
  flexFlow: "column",
  "@md": {
    flexFlow: "row",
    alignItems: "center",
  },
});

export default function Posts({ posts }) {
  return (
    <Layout>
      {posts.map((post, index) => {
        return (
          <PostPreview key={`post_listing_${index}`}>
            <PostTitle>
              <h4>
                <Link href={`/posts/${post.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </h4>
              <Taglist tags={post.frontmatter.tags} />
            </PostTitle>
            <i> &lt;{post.frontmatter.date}&gt;</i>
          </PostPreview>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(["frontmatter", "slug"]);
  return {
    props: {
      posts,
    },
  };
}

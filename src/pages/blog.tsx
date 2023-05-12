import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import { Post } from "../lib/types";
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

const Posts = ({ posts }: { posts: Post[] }) => {
  /* console.log(posts); */
  return (
    <Layout>
      {posts.map((post, index) => {
        return (
          <PostPreview key={`post_listing_${index}`}>
            <PostTitle>
              <h4>
                <Link href={`/posts/${post.slug}`}>
                  <a href={`/posts/${post.slug}`}>{post.title}</a>
                </Link>
              </h4>
              <Taglist tags={post.tags} />
            </PostTitle>
            <i> &lt;{post.date}&gt;</i>
          </PostPreview>
        );
      })}
    </Layout>
  );
};

export default Posts;

export function getStaticProps() {
  const posts = getAllPosts(["slug", "title", "tags", "date"]);
  return {
    props: {
      posts,
    },
  };
}

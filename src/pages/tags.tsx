import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import { styled } from "../theme.config";

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

const TagWrapper = styled("div", {
  fontSize: "var(--fontSizes-sm)",
  display: "inline-block",
  mb: "$2",
  "@md": {
    marginLeft: "auto",
  },
});

/* function Tag({ name }) {
 *   return <Link href={`/:${name}:`}>{name}</Link>;
 * }
 *
 * function Taglist({ tags }) {
 *   return (
 *     <TagWrapper>
 *       {tags.map((tag) => (
 *         <span key={tag}>
 *           :
 *           <Tag name={tag} />:
 *         </span>
 *       ))}
 *     </TagWrapper>
 *   );
 * } */

export default function Tags({ tags }) {
  /* console.log({ posts }); */
  return (
    <Layout>
      {tags.map((tag, index) => {
        return (
          <div key={`tags_${index}`}>
            <Link href={`/tags/${tag}`}>{tag}</Link>
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(["frontmatter", "slug"]);

  let tags = posts.reduce((acc, post) => {
    post.frontmatter.tags?.map((tag) => {
      acc.push(tag);
    });
    return acc;
  }, []);

  tags = [...new Set(tags)]; //uniquify list

  return {
    props: {
      tags,
    },
  };
}

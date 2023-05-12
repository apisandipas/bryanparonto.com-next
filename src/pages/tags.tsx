import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import { Post } from "../lib/types";
import { uniqueFilter } from "../lib/utils";

export default function Tags({ tags }: { tags: string[] }) {
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

export function getStaticProps() {
  const posts = getAllPosts(["slug", "title", "tags"]);

  let tags = posts.reduce((acc: string[], post: Post) => {
    post.tags?.map((tag) => {
      acc.push(tag);
    });
    return acc;
  }, []);

  tags = (tags as string[]).filter(uniqueFilter); //uniquify list

  return {
    props: {
      tags,
    },
  };
}

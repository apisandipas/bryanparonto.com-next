import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/Layout";
import { getAllPosts } from "../../lib/api";
import { uniqueFilter } from "../../lib/utils";
import { Post } from "../../lib/types";

interface TagProps {
  tags: Post[];
  slug: string;
}

export default function Tag({ posts, slug }: TagProps) {
  const router = useRouter();
  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <h2>Posts with: {slug}</h2>
      {posts.map((post, index) => {
        return (
          <div key={`tag_link_${index}`}>
            <Link href={`/posts/${post.slug}`}>
              <a href={`/posts/${post.slug}`}>{post.title}</a>
            </Link>
          </div>
        );
      })}
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
  const posts = getAllPosts(["tags"]);

  let tags = posts.reduce((acc: any[], post: Post): string[] => {
    post.tags?.map((tag) => {
      acc.push(tag);
    });
    return acc;
  }, []);

  tags = tags.filter(uniqueFilter);

  return {
    paths: tags.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

// Fetch necessary data for the blog post using params.id

export function getStaticProps({ params: { slug } }: Params) {
  let posts = getAllPosts(["tags", "slug", "title"]);
  console.log(posts);
  posts = posts.filter((p) => p.tags.includes(slug));
  console.log(posts);
  return {
    props: {
      posts,
      slug,
    },
  };
}

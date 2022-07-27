import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/Layout";
import { getAllPosts } from "../../lib/api";
import { uniqueFilter } from "../../lib/utils"
import { Post } from "../../lib/types"

interface TagProps {
  tags: Post[];
  slug: string;
}

export default function Tag({ tags, slug }: TagProps) {
  const router = useRouter();
  if (!router.isFallback && !tags) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <h2>Posts with: {slug}</h2>
      {tags.map((post, index) => {
        return (
          <div key={`tag_link_${index}`}>
            <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
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
export async function getStaticPaths() {
  const posts = await getAllPosts();
  /* const t = posts.filter((p: Post) => p.frontmatter.tags); */

  let tags = posts.reduce((acc: any[], post: Post): string[] => {
    post.frontmatter.tags?.map((tag) => {
      acc.push(tag);
    });
    return acc;
  }, []);

  tags = tags.filter(uniqueFilter)

  return {
    paths: tags.map((slug) => ({

      params: {
        slug,
      },
    })),
    /* paths: [{ params: { slug: "polybar" } }], */
    fallback: false,
  };
}

// Fetch necessary data for the blog post using params.id

export async function getStaticProps({ params: { slug } }: Params) {
  const posts = await getAllPosts();
  const tags = posts.filter((p: Post) => p.frontmatter.tags.includes(slug));
  return {
    props: {
      tags,
      slug
    },
  };
}

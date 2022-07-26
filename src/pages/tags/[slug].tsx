import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/Layout";
import { getAllPosts } from "../../lib/api";

export default function Tag({ tags, slug }) {
  const router = useRouter();
  if (!router.isFallback && !tags) {
    return <ErrorPage statusCode={404} />;
  }
  console.log(tags);
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
      {/* {post} */}
      {/* <h1>{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
          <div dangerouslySetInnerHTML={{ __html: post?.content }} /> */}
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
  /* const slugs = await getPostSlugs(); */

  const posts = await getAllPosts();
  const t = posts.filter((p) => p.frontmatter.tags);
  console.log({t})

  let tags = posts.reduce((acc, post) => {
    post.frontmatter.tags?.map((tag) => {
      acc.push(tag);
    });
    return acc;
  }, []);

  tags = [...new Set(tags)]; //uniquify list

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
  const tags = posts.filter((p) => p.frontmatter.tags.includes(slug));
  return {
    props: {
      tags,
      slug
    },
  };
}

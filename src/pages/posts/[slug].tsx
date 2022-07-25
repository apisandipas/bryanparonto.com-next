import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import ErrorPage from "next/error";
import Layout from "../../components/Layout";
import { getPostBySlug, getAllPosts, getPostSlugs } from "../../lib/api";
import orgToHtml from "../../lib/orgToHtml";
import metadata from "@orgajs/metadata";

const postsDirectory = path.join(process.cwd(), "content");

export default function Post(post) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      {post.title}
      <div dangerouslySetInnerHTML={{ __html: post?.content }} />
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

  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }));

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

export async function getStaticProps({ params: { slug } }) {
  const post = await getPostBySlug(slug, ["frontmatter", "content"]);
  return {
    props: post,
  };
}

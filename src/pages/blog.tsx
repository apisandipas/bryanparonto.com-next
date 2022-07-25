import Link from "next/link";
import Layout from "../components/Layout";
import { getPostSlugs, getAllPosts } from "../lib/api";
import { sortByDate } from "../lib/utils";
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

function Tag({ name }) {
  return <Link href={`/:${name}:`}>{name}</Link>;
}

function Taglist({ tags }) {
  return (
    <TagWrapper>
      {tags.map((tag) => (
        <span key={tag}>
          :
          <Tag name={tag} />:
        </span>
      ))}
    </TagWrapper>
  );
}

export default function Posts({ posts }) {
  /* console.log({ posts }); */
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
            {/* <i> &lt;{formatDate(date)}&gt;</i> */}
          </PostPreview>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(["frontmatter", "slug"]);
  console.log({ fm: posts[0].frontmatter });
  return {
    props: {
      posts,
    },
  };
}

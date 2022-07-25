import fs from "fs";
import path from "path";
import metadata from "@orgajs/metadata";
import orgToHtml from "./orgToHtml";
import { sortByDate } from "./utils";
const postsDirectory = path.join(process.cwd(), "content");

export function getPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((filename) => {
    return filename.replace(".org", "");
  });
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  // console.log({ slug });
  const orgdownWithMeta = fs.readFileSync(
    path.join(postsDirectory, slug + ".org"),
    "utf-8"
  );

  const frontmatter = metadata(orgdownWithMeta);
  const content = await orgToHtml(orgdownWithMeta);

  const items = {};
  items["slug"] = slug;

  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    }
    if (field == "frontmatter") {
      frontmatter.tags = frontmatter.tags?.split(" ");
      items[field] = frontmatter;
    }
  });
  return items;
}

export async function getAllPosts(fields: string[] = []) {
  const postSlugs = getPostSlugs();

  const posts = await Promise.all(
    postSlugs.map(async function (slug) {
      return await getPostBySlug(slug, ["frontmatter"]);
    })
  );

  return posts.sort(sortByDate);
}

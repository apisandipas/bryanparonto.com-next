import fs from "fs";
import { join } from "path";
import orgToHtml from "./orgToHtml";
import { Post } from "./types";

const postsDirectory = join(process.cwd(), "content");
const projectsDirectory = join(process.cwd(), "projects");

export function getPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((filename) => {
    return filename.replace(".org", "");
  });
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.org$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.org`);
  const content = fs.readFileSync(fullPath, "utf8");
  const org = orgToHtml(content);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = String(org);
    }
    if (org.data[field]) {
      items[field] = org.data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .map((post: any) => {
      post.tags = post.tags?.split(" ");
      return post;
    })
    // sort posts by date in descending order
    .sort((post1, post2) => +new Date(post2.date) - +new Date(post1.date));
  return posts;
}

export function getProjectsSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((filename) => {
    return filename.replace(".org", "");
  });
}

export async function getProjectsBySlug(slug, fields: string[] = []) {
  const realSlug = slug.replace(/\.org$/, "");
  const fullPath = join(projectsDirectory, `${realSlug}.org`);
  const content = fs.readFileSync(fullPath, "utf8");
  const org = orgToHtml(content);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = String(org);
    }
    if (org.data[field]) {
      items[field] = org.data[field];
    }
  });

  return items;
}

export async function getAllProjects() {
  const projectsSlugs = getProjectsSlugs();

  const projects = await Promise.all(
    projectsSlugs.map(async function (slug) {
      return await getProjectsBySlug(slug, [
        "title",
        "image",
        "url",
        "content",
        "tech",
        "client",
        "launch_date",
      ]);
    })
  );

  return projects;
}

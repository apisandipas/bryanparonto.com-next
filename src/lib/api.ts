import fs from "fs";
import path from "path";
import metadata from "@orgajs/metadata";
import orgToHtml from "./orgToHtml";
import { sortByDate } from "./utils";

const postsDirectory = path.join(process.cwd(), "content");
const projectsDirectory = path.join(process.cwd(), "projects");

export function getPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((filename) => {
    return filename.replace(".org", "");
  });
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
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
      frontmatter.tags = frontmatter.tags?.split(' ') || []
      items[field] = frontmatter;
    }
  });
  return items;
}

export async function getAllPosts() {
  const postSlugs = getPostSlugs();

  const posts = await Promise.all(
    postSlugs.map(async function (slug) {
      return await getPostBySlug(slug, ["frontmatter"]);
    })
  );

  return posts.sort(sortByDate);
}

export function getProjectsSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((filename) => {
    return filename.replace(".org", "");
  });
}

export async function getProjectsBySlug(slug, fields: string[] = [] ) {
  const orgdownWithMeta = fs.readFileSync(
    path.join(projectsDirectory, slug + ".org"),
    "utf-8"
  );

  const frontmatter = metadata(orgdownWithMeta);
  const content = await orgToHtml(orgdownWithMeta);

  const items = {
    ...frontmatter
  };
  items["slug"] = slug;
  items["content"] = content
  // items


  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    }
    if (field == "frontmatter") {
      // frontmatter.tech = frontmatter.tech?.split(' ')
      items[field] = frontmatter;
    }
  });
  return items;
}

export async function getAllProjects() {
  const projectsSlugs = getProjectsSlugs();

  const projects = await Promise.all(
    projectsSlugs.map(async function (slug) {
      return await getProjectsBySlug(slug, ["frontmatter"]);
    })
  );

  return projects;
}

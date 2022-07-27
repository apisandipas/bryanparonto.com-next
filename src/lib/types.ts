
export interface PostFrontmatter {
  title?: string;
  tags?: string[];
  date?: string;
}

export interface Post {
  title?: string;
  content?: string;
  slug?: string;
  frontmatter?: PostFrontmatter
}



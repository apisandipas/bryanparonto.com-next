import { unified } from "unified";
import html from "rehype-stringify";

import uniorg from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";
import extractKeywords from "uniorg-extract-keywords";
import rehypePrism from "@mapbox/rehype-prism";

const processor = unified()
  .use(uniorg)
  .use(extractKeywords)
  .use(uniorg2rehype)
  .use(rehypePrism, {
    ignoreMissing: true,
  })
  .use(html);

export default function orgToHtml(org) {
  const result = processor.processSync(org);
  return result;
}

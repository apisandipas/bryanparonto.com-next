import { remark } from "remark";
import reorg from "@orgajs/reorg";
import mutate from "@orgajs/reorg-rehype";
import html from "rehype-stringify";

export default async function orgToHtml(orgdown: string) {
  const result = await reorg().use(html).use(mutate).process(orgdown);
  return result.toString();
}

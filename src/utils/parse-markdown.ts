import { unified } from "unified/index.js";
import remarkParse from "https://cdn.skypack.dev/remark-parse@10";

export default function parseMarkdown(mdText: string) {
  const processor = unified().use(remarkParse);
  const ast = processor.parse(mdText);
  return ast;
}

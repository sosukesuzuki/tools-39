import { remarkGfm, remarkParse, unified } from "../../deps.ts";

export default function parseMarkdown(text: string) {
  const processor = unified().use(remarkParse).use(remarkGfm);
  const res = processor.parse(text);
  return res;
}

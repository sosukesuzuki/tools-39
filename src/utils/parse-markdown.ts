import { remarkGfm, remarkParse, unified } from "../../deps.ts";

export default function parseMarkdown(text: string) {
  const processor = unified()
    .use(
      // @ts-expect-error I don't know how to fix this type error
      remarkParse
    )
    .use(remarkGfm);
  const res = processor.parse(text);
  return res;
}

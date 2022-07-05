import {
  gfmTableToMarkdown,
  toMarkdown as unistToMarkdown,
} from "../../deps.ts";

export default function toMarkdown(
  // deno-lint-ignore no-explicit-any
  ast: any,
): string {
  return unistToMarkdown(ast, { extensions: [gfmTableToMarkdown()] });
}

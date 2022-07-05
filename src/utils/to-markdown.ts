import {
  toMarkdown as unistToMarkdown,
  gfmTableToMarkdown,
} from "../../deps.ts";

export default function toMarkdown(ast: any): string {
  return unistToMarkdown(ast, { extensions: [gfmTableToMarkdown()] });
}

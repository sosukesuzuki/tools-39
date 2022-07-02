import { parse } from "datetime/mod.ts";
import parseMarkdown from "../utils/parse-markdown.ts";
import leftPad from "../utils/left-pad.ts";

export interface Args {
  help: boolean;
}

function getAgendasURL(year: number, month: number) {
  const stringifiedYear = `${year}`;
  const stringifiedMonth = `${leftPad(month, 2, "0")}`;
  return `https://raw.githubusercontent.com/tc39/agendas/HEAD/${stringifiedYear}/${stringifiedMonth}.md`;
}

const help = `tools-39 agendas
Prints proposals introduced at the meeting for the month specified in yyyy/MM

USAGE:
    tools-39 agendas <MONTH>`;

// deno-lint-ignore no-explicit-any
export default async function (rawArgs: Record<string, any>): Promise<void> {
  const args: Args = {
    help: !!rawArgs.help,
  };
  if (args.help) {
    console.log(help);
    Deno.exit(0);
  }
  const rawMonthSpecifier: string | null =
    typeof rawArgs._[0] === "string" ? rawArgs._[0] : null;
  if (rawMonthSpecifier === null) {
    console.error(help);
    console.error(`No month specifier given.`);
    Deno.exit(1);
  }
  if (rawArgs._.length > 1) {
    console.error(help);
    console.error(`Too many positional arguments given.`);
    Deno.exit(1);
  }
  let parsedMonth;
  try {
    parsedMonth = parse(rawMonthSpecifier, "yyyy/MM");
  } catch {
    console.error(help);
    console.error(`Invalid month specifier given.`);
    Deno.exit(1);
  }

  const year = parsedMonth.getFullYear();
  const month = parsedMonth.getMonth() + 1;

  const agendaURL = getAgendasURL(year, month);

  const res = await fetch(agendaURL);
  const mdText = await res.text();

  const parsed = parseMarkdown(mdText);

  console.log(parsed.content);
}

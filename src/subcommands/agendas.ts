import leftPad from "../utils/left-pad.ts";
import parseMarkdown from "../utils/parse-markdown.ts";
import toMarkdown from "../utils/to-markdown.ts";
import { datetime, unistVisit } from "../../deps.ts";

const toListItem = (value: string) => `- ${value}`;

export interface Args {
  help: boolean;
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
    parsedMonth = datetime.parse(rawMonthSpecifier, "yyyy/MM");
  } catch {
    console.error(help);
    console.error(`Invalid month specifier given.`);
    Deno.exit(1);
  }

  const year = parsedMonth.getFullYear();
  const month = parsedMonth.getMonth() + 1;

  const agendaURL = getAgendasURL(year, month);

  const res = await fetch(agendaURL);
  if (res.status === 404) {
    console.error(help);
    console.log(`${rawMonthSpecifier} not found.`);
    Deno.exit(1);
  }
  const mdText = await res.text();

  const ast = parseMarkdown(mdText);
  const proposals = getProposals(ast);

  let output = "";
  output += `# ${year}/${month} TC39 meeting agenda\n\n`;
  output += "## For Stage 1\n\n";
  output += proposals.forStage1.map(toListItem).join("");
  output += "\n";
  output += "## For Stage 2\n\n";
  output += proposals.forStage2.map(toListItem).join("");
  output += "\n";
  output += "## For Stage 3\n\n";
  output += proposals.forStage3.map(toListItem).join("");
  output += "\n";
  output += "## For Stage 4\n\n";
  output += proposals.forStage4.map(toListItem).join("");
  output += "\n";
  output += "## Others\n\n";
  output += proposals.others.map(toListItem).join("");

  console.log(output);
}

function getAgendasURL(year: number, month: number) {
  const stringifiedYear = `${year}`;
  const stringifiedMonth = `${leftPad(String(month), 2, "0")}`;
  return `https://raw.githubusercontent.com/tc39/agendas/HEAD/${stringifiedYear}/${stringifiedMonth}.md`;
}

type Proposals = {
  forStage1: string[];
  forStage2: string[];
  forStage3: string[];
  forStage4: string[];
  others: string[];
};

function getProposals(
  // deno-lint-ignore no-explicit-any
  ast: any
): Proposals {
  const proposals: Proposals = {
    forStage1: [],
    forStage2: [],
    forStage3: [],
    forStage4: [],
    others: [],
  };
  unistVisit(ast, "listItem", (node) => {
    const includesProposalsTable = ((child) => {
      if (
        child.type === "paragraph" &&
        child.children[0].type === "text" &&
        child.children[0].value === "Proposals"
      ) {
        return true;
      }
      return false;
    })(node.children[0]);

    if (includesProposalsTable) {
      const maybeTable = node.children.find(
        (
          // deno-lint-ignore no-explicit-any
          child: any
        ) => child.type === "table"
      );
      if (maybeTable) {
        const table = maybeTable;
        for (const row of table.children.filter(
          (
            // deno-lint-ignore no-explicit-any
            child: any,
            i: number
          ) => i !== 0 && child.type === "tableRow"
        )) {
          const cells = row.children.filter(
            (
              // deno-lint-ignore no-explicit-any
              child: any
            ) => child.type === "tableCell"
          );
          const stageCell = cells[1];
          const proposalCell = cells[3];

          let stage: 0 | 1 | 2 | 3 | 4 | null;
          try {
            stage = parseInt(stageCell.children[0].value, 10) as
              | 0
              | 1
              | 2
              | 3
              | 4;
          } catch {
            stage = null;
          }

          const stringifiedProposal = toMarkdown(proposalCell);
          if (stringifiedProposal.toLowerCase().includes("for stage ")) {
            switch (stage) {
              case 0:
                proposals.forStage1.push(stringifiedProposal);
                break;
              case 1:
                proposals.forStage2.push(stringifiedProposal);
                break;
              case 2:
                proposals.forStage3.push(stringifiedProposal);
                break;
              case 3:
                proposals.forStage4.push(stringifiedProposal);
                break;
              default:
                proposals.others.push(stringifiedProposal);
            }
          } else {
            proposals.others.push(stringifiedProposal);
          }
        }
      }
    }
  });
  return proposals;
}

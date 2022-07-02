#!/usr/bin/env -S deno run --allow-read --allow-env --allow-net --allow-run

import { parse } from "flags/mod.ts";
import agendasSubcommand from "./src/subcommands/agendas.ts";

const VERSION = "1.0.0";

const help = `tools-39 ${VERSION}
Command line tools for following TC39 activity.

SUBCOMMANDS:
    agendas    Prints proposals introduced at the meeting for the month specified in YYYY/MM`;

const args = parse(Deno.args, {
  alias: {
    help: "h",
    version: "V",
  },
});

const subcommand = args._.shift();
switch (subcommand) {
  case "agendas": {
    await agendasSubcommand(args);
    break;
  }
  default: {
    if (args.version) {
      console.log(`tools-39 ${VERSION}`);
      Deno.exit(0);
    }
    if (args.help) {
      console.log(help);
      Deno.exit(0);
    }
    console.error(help);
    Deno.exit(1);
  }
}

import { flags, semver } from "../deps.ts";

const parsedFlags = flags.parse<Record<"version", "patch" | "minor" | "major">>(
  Deno.args,
);

if (
  parsedFlags.version !== "patch" &&
  parsedFlags.version !== "minor" &&
  parsedFlags.version !== "major"
) {
  console.log(`${parsedFlags.version} is invalid version specifier.`);
  Deno.exit(1);
}

const { version } = parsedFlags;

const decoder = new TextDecoder();

const gitTagProcess = Deno.run({ cmd: ["git", "tag"], stdout: "piped" });

const tagNames = decoder
  .decode(await gitTagProcess.output())
  .split("\n")
  .filter(Boolean);

const latestTag = tagNames.at(-1);

if (latestTag === undefined) {
  console.log("Latest tag not found");
  Deno.exit(1);
}

const newVersion = semver.inc(latestTag, version);

if (newVersion === null) {
  console.log("Failt to increment version");
  Deno.exit(1);
}

const newVersionTag = newVersion.startsWith("v")
  ? newVersion
  : `v${newVersion}`;

const newTagProcess = Deno.run({ cmd: ["git", "tag", newVersionTag] });
await newTagProcess.status();

const tagPushProcess = Deno.run({
  cmd: ["git", "push", "origin", newVersionTag],
});
await tagPushProcess.status();

console.log(`New tag ${newVersionTag} has been pushed!`);
console.log(
  `Please open https://github.com/sosukesuzuki/tools-39/releases/new?tag=${newVersionTag}`,
);

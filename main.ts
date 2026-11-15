// makefun-coin-promo-01 entry: "Launch a coin that sells make.fun".
// The coin itself is the entry. This program just copies the launch
// receipt (LAUNCH.json, written by the launcher at the repo root) into
// /output so the bounty gate can read it. Stdlib only, Node 22.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The grader mounts the repo at /bot, same as the starter default.
const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const launchPath = join(botDir, "LAUNCH.json");
if (!existsSync(launchPath)) {
  console.error(`error: LAUNCH.json not found at ${launchPath} — the coin has not been launched yet, nothing to copy.`);
  process.exit(1);
}
let launchContents: string;
try {
  launchContents = readFileSync(launchPath, "utf8");
} catch (err) {
  console.error(`error: LAUNCH.json at ${launchPath} is unreadable: ${(err as Error).message}`);
  process.exit(1);
}
if (!launchContents.trim()) {
  console.error(`error: LAUNCH.json at ${launchPath} is empty.`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, "LAUNCH.json"), join(outDir, "LAUNCH.json"));

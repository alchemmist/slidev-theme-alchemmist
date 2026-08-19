import { execFileSync } from "node:child_process";

const output = execFileSync("npm", ["pack", "--dry-run", "--json"], {
  encoding: "utf8",
});
const [result] = JSON.parse(output);
const required = [
  "components/Card.vue",
  "layouts/default.vue",
  "styles/index.css",
  "theme/config.ts",
];
const files = new Set(result.files.map(({ path }) => path));
const missing = required.filter((path) => !files.has(path));

if (missing.length)
  throw new Error(`Package is missing: ${missing.join(", ")}`);

if (result.unpackedSize > 2_500_000)
  throw new Error(`Package exceeds 2.5 MB: ${result.unpackedSize} bytes`);

process.stdout.write(
  `${result.filename}: ${result.files.length} files, ${result.unpackedSize} bytes unpacked\n`,
);

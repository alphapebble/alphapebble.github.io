// scripts/patch-standalone-node-mods.js
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "node_modules");
const DST = path.join(ROOT, ".next/standalone/node_modules");

// Add tiny runtime deps that OpenNext sometimes needs
const packages = [
  "@next/env",
  "@swc/helpers",
  "client-only",
  "scheduler",
  "styled-jsx",
  "tslib",
  // the ones your error shows
  "color-convert",
  "color-name",
  "ansi-styles",
  "supports-color",
];

function copyPkg(pkg) {
  const from = path.join(SRC, pkg);
  const to = path.join(DST, pkg);
  if (!fs.existsSync(from)) {
    console.warn(`Skip: ${pkg} not found in project node_modules`);
    return;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  try { fs.rmSync(to, { recursive: true, force: true }); } catch {}
  fs.cpSync(from, to, { recursive: true });
  console.log(`Copied ${pkg} -> ${to}`);
}

for (const pkg of packages) copyPkg(pkg);

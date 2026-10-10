#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Copie dans dist/ uniquement les fichiers nécessaires à l'extension.
// Utile dès que node_modules/ existe : Chrome refuse de charger un dossier
// contenant des fichiers dont le nom commence par « _ » (il y en a dans
// node_modules). Charger alors dist/ dans chrome://extensions.
// ---------------------------------------------------------------------------

import { cp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const RUNTIME = ["manifest.json", "index.html", "css", "src", "data", "assets"];
const EXCLUDED = [path.join(root, "assets/unused")];

await rm(dist, { recursive: true, force: true });
for (const entry of RUNTIME) {
	await cp(path.join(root, entry), path.join(dist, entry), {
		recursive: true,
		filter: (src) => !EXCLUDED.some((dir) => src.startsWith(dir)),
	});
}

const reserved = (await readdir(dist, { recursive: true })).filter((f) =>
	path.basename(f).startsWith("_"),
);
if (reserved.length) {
	console.error(`Noms réservés par Chrome (commencent par « _ ») :\n${reserved.join("\n")}`);
	process.exit(1);
}
console.log(
	"Extension prête dans dist/ (chrome://extensions → Charger l'extension non empaquetée).",
);

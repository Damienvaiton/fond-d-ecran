#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Régénère data/assets.json : la liste des fonds d'écran et des photos
// d'artistes disponibles. Une extension Chrome ne peut pas lister ses propres
// fichiers, d'où ce manifeste généré. À lancer après chaque ajout/suppression
// d'image dans assets/backgrounds ou assets/artists :
//   npm run assets            (écrit le fichier)
//   npm run assets -- --check (échoue si le fichier n'est pas à jour)
// ---------------------------------------------------------------------------

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "data/assets.json");
const IMAGE = /\.(webp|avif|png|jpe?g|gif)$/i;
const collator = new Intl.Collator("fr", { numeric: true });

const images = async (dir) =>
	(await readdir(path.join(root, dir))).filter((f) => IMAGE.test(f)).sort(collator.compare);

const isAnimation = (f) => (f.startsWith("anim-") ? 1 : 0);

const manifest = {
	// Images fixes d'abord, animations ensuite, ordre naturel (2 < 10)
	backgrounds: (await images("assets/backgrounds")).sort(
		(a, b) => isAnimation(a) - isAnimation(b) || collator.compare(a, b),
	),
	artistPhotos: await images("assets/artists"),
};

const json = `${JSON.stringify(manifest, null, "\t")}\n`;

if (process.argv.includes("--check")) {
	const current = await readFile(output, "utf8").catch(() => "");
	if (current !== json) {
		console.error("data/assets.json n'est pas à jour : lancez `npm run assets`.");
		process.exit(1);
	}
	console.log("data/assets.json est à jour.");
} else {
	await writeFile(output, json);
	console.log(
		`data/assets.json : ${manifest.backgrounds.length} fonds, ${manifest.artistPhotos.length} photos d'artistes.`,
	);
}

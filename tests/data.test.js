// Vérifie la cohérence des données livrées avec l'extension.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";
import { DEFAULT_ARTISTS, FLAGS, PROFILES, PROFILE_NAMES } from "../src/config.js";
import { isValidDate } from "../src/core/dates.js";
import { inferFlag, isHttpUrl, nameFromUrl, normalizeUrl } from "../src/core/url.js";

const read = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url)));

describe("data/events.json", () => {
	const groups = read("data/events.json");

	it("contient des sorties valides", () => {
		for (const { artist, profiles, discography } of groups) {
			assert.ok(artist, "artiste sans nom");
			assert.ok(
				profiles.every((p) => PROFILE_NAMES.includes(p)),
				`${artist} : profil inconnu`,
			);
			for (const r of discography) {
				const { day, month, year } = r.release_date;
				assert.ok(isValidDate(day, month, year), `${artist} / ${r.name} : date invalide`);
				assert.ok(["album", "EP"].includes(r.type), `${artist} / ${r.name} : type ${r.type}`);
			}
		}
	});
});

describe("src/config.js", () => {
	it("a des identifiants de store uniques, des URLs et drapeaux valides", () => {
		const ids = DEFAULT_ARTISTS.flatMap((a) => a.stores.map((s) => s.id));
		assert.equal(new Set(ids).size, ids.length);
		for (const store of DEFAULT_ARTISTS.flatMap((a) => a.stores)) {
			assert.ok(isHttpUrl(store.url), store.url);
			assert.ok(FLAGS.includes(store.flag), store.flag);
		}
	});

	it("ne masque que des fonds qui existent", () => {
		const { backgrounds } = read("data/assets.json");
		for (const [name, { hiddenBackgrounds }] of Object.entries(PROFILES))
			for (const file of hiddenBackgrounds)
				assert.ok(backgrounds.includes(file), `${name} : ${file} introuvable`);
	});

	it("a un drapeau pour chaque code", () => {
		for (const flag of FLAGS)
			assert.ok(existsSync(new URL(`../assets/flags/${flag}.png`, import.meta.url)), flag);
	});
});

describe("data/assets.json", () => {
	const manifest = read("data/assets.json");
	const files = (dir) => readdirSync(new URL(`../assets/${dir}`, import.meta.url)).sort();

	it("liste exactement les fonds et photos présents", () => {
		assert.deepEqual([...manifest.backgrounds].sort(), files("backgrounds"));
		assert.deepEqual([...manifest.artistPhotos].sort(), files("artists"));
	});
});

describe("URLs", () => {
	it("normalise et valide", () => {
		assert.equal(normalizeUrl(" youtube.com "), "https://youtube.com");
		assert.equal(normalizeUrl("http://a.fr"), "http://a.fr");
		assert.ok(isHttpUrl("https://a.fr"));
		assert.ok(!isHttpUrl("javascript:alert(1)"));
		assert.ok(!isHttpUrl("https://pas une url"));
		assert.ok(!isHttpUrl("https://motseul"));
		assert.ok(isHttpUrl("http://localhost:8080"));
		assert.equal(nameFromUrl("www.youtube.com/watch"), "Youtube");
	});

	it("devine le drapeau par segment de hostname", () => {
		assert.equal(inferFlag("https://taylorswift-store.fr"), "fr");
		assert.equal(inferFlag("https://storefr.sabrinacarpenter.com/"), "fr");
		assert.equal(inferFlag("https://shopuk.gracieabrams.com"), "uk");
		assert.equal(inferFlag("https://bad-world.co.uk/"), "uk");
		assert.equal(inferFlag("https://gracieabrams.universal-music.de/en"), "de");
		assert.equal(inferFlag("https://shop.deadmau5.com"), "web");
		assert.equal(inferFlag("https://store.francais.com"), "web");
	});
});

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import {
	addArtist,
	addStore,
	getAllArtistNames,
	getArtists,
	removeArtist,
	removeStore,
	resolveArtists,
	setArtistOrder,
	setStoresEnabled,
} from "../src/features/artists/catalog.js";
import { freshStorage } from "./helpers.js";

const defaults = [
	{
		name: "A",
		initials: "A",
		category: "store",
		profiles: ["Alex", "Carotte"],
		stores: [
			{ id: "a1", label: "A1", flag: "fr", url: "https://a1.fr" },
			{ id: "a2", label: "A2", flag: "uk", url: "https://a2.co.uk" },
		],
	},
	{ name: "B", initials: "B", category: "autres", profiles: ["Alex"], stores: [] },
];

describe("resolveArtists", () => {
	it("filtre par profil et applique les préférences", () => {
		const artists = resolveArtists({
			user: "Alex",
			defaults,
			customArtists: [{ name: "C", profiles: ["Alex"] }],
			prefs: {
				order: ["C", "A"],
				hidden: ["B"],
				disabledStores: ["a2"],
				removedStores: ["a1"],
				addedStores: { A: [{ id: "x", label: "X", flag: "web", url: "https://x.com" }] },
			},
		});
		assert.deepEqual(
			artists.map((a) => a.name),
			["C", "A"],
		);
		assert.equal(artists[0].initials, "C");
		assert.deepEqual(
			artists[1].stores.map((s) => [s.id, s.enabled]),
			[
				["a2", false],
				["x", true],
			],
		);
	});

	it("ignore un artiste ajouté qui porte le nom d'un artiste par défaut", () => {
		const artists = resolveArtists({
			user: "Carotte",
			defaults,
			customArtists: [{ name: "A", profiles: ["Carotte"] }],
		});
		assert.deepEqual(
			artists.map((a) => a.name),
			["A"],
		);
	});
});

describe("opérations sur le catalogue (données réelles de src/config.js)", () => {
	beforeEach(() => freshStorage());

	it("les valeurs par défaut viennent toujours du code", () => {
		const names = getArtists("Alex").map((a) => a.name);
		assert.ok(names.includes("Taylor Swift"));
	});

	it("retire puis réaffiche un artiste par défaut, pour un seul profil", () => {
		removeArtist("Alex", "Taylor Swift");
		assert.ok(!getArtists("Alex").some((a) => a.name === "Taylor Swift"));
		assert.ok(getArtists("Carotte").some((a) => a.name === "Taylor Swift"));
		assert.equal(addArtist({ name: "Taylor Swift", profiles: ["Alex"] }), true);
		assert.ok(getArtists("Alex").some((a) => a.name === "Taylor Swift"));
	});

	it("ajoute un artiste personnalisé partagé entre profils", () => {
		assert.equal(addArtist({ name: "Olivia Rodrigo", profiles: ["Alex"] }), true);
		assert.equal(addArtist({ name: "Olivia Rodrigo", profiles: ["Alex"] }), false);
		addArtist({ name: "Olivia Rodrigo", profiles: ["Carotte"] });
		const olivia = getArtists("Carotte").find((a) => a.name === "Olivia Rodrigo");
		assert.equal(olivia.initials, "OR");
		removeArtist("Alex", "Olivia Rodrigo");
		assert.ok(!getArtists("Alex").some((a) => a.name === "Olivia Rodrigo"));
		assert.ok(getArtists("Carotte").some((a) => a.name === "Olivia Rodrigo"));
	});

	it("ajoute, désactive et supprime des stores", () => {
		const store = addStore("Alex", "Tate McRae", { label: "Store FR", url: "tatemcrae.fr" });
		assert.equal(store.flag, "fr");
		assert.equal(store.url, "https://tatemcrae.fr");

		setStoresEnabled("Alex", ["tm_eu", store.id], false);
		const tate = () => getArtists("Alex").find((a) => a.name === "Tate McRae");
		assert.deepEqual(
			tate()
				.stores.filter((s) => !s.enabled)
				.map((s) => s.id),
			["tm_eu", store.id],
		);

		removeStore("Alex", "Tate McRae", store.id);
		removeStore("Alex", "Tate McRae", "tm_uk");
		assert.deepEqual(
			tate().stores.map((s) => s.id),
			["tm_eu", "tm_us"],
		);
	});

	it("mémorise l'ordre des artistes", () => {
		setArtistOrder("Alex", ["Autres", "Disquaires"]);
		const names = getArtists("Alex").map((a) => a.name);
		assert.deepEqual(names.slice(0, 2), ["Autres", "Disquaires"]);
	});
});

describe("getAllArtistNames", () => {
	beforeEach(() => freshStorage());

	it("exclut les regroupements de boutiques", () => {
		addArtist({ name: "Ma boutique", category: "autres", profiles: ["Alex"] });
		addArtist({ name: "Olivia Rodrigo", profiles: ["Alex"] });
		const names = getAllArtistNames().map((a) => a.name);
		assert.ok(names.includes("Taylor Swift"));
		assert.ok(names.includes("Olivia Rodrigo"));
		for (const group of ["Disquaires", "Autres", "Ma boutique"]) assert.ok(!names.includes(group));
	});
});

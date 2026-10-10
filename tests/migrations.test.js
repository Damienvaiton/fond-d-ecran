import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DEFAULT_ARTISTS } from "../src/config.js";
import { SCHEMA_VERSION, runMigrations } from "../src/core/migrations.js";
import { getArtists } from "../src/features/artists/catalog.js";
import { freshStorage, json } from "./helpers.js";

// Copie figée telle que l'écrivait la v1 au premier lancement
const seeded = (user) => structuredClone(DEFAULT_ARTISTS.filter((a) => a.profiles.includes(user)));

describe("migration v1 → v2", () => {
	it("convertit les données de la v1 sans rien perdre", () => {
		const alex = seeded("Alex")
			.filter((a) => a.name !== "Disquaires") // artiste supprimé
			.map((a) =>
				a.name === "Tate McRae"
					? {
							...a,
							stores: [
								...a.stores.filter((s) => s.id !== "tm_uk"), // store supprimé
								{ id: "tm_fr", label: "Store FR", flag: "fr", url: "https://tm.fr" },
							],
						}
					: a,
			);
		alex.push({
			name: "Olivia Rodrigo",
			initials: "OR",
			category: "store",
			profiles: ["Alex"],
			stores: [{ id: "or_us", label: "US", flag: "us", url: "https://or.com" }],
		});

		const storage = freshStorage({
			storeData_Alex: alex,
			disabledStores_Alex: ["ts_us"],
			artistOrder_Alex: ["Olivia Rodrigo"],
			displayName_Alex: "Alexandre",
			clockVisible_Alex: "false",
			eventsFilter_Carotte: "true",
			customArtists: [{ artist: "Niall Horan", profiles: ["Carotte"] }],
			releaseCache_2026_01_01_x: { a: 1 },
			storeData_null: [],
			shortcuts_Alex: [{ name: "YT", url: "https://youtube.com" }],
		});

		runMigrations();

		assert.equal(storage.getItem("schemaVersion"), String(SCHEMA_VERSION));
		assert.deepEqual(json(storage, "settings_Alex"), {
			displayName: "Alexandre",
			clockVisible: false,
		});
		assert.deepEqual(json(storage, "settings_Carotte"), { ownEventsOnly: true });
		assert.deepEqual(json(storage, "artistPrefs_Alex"), {
			order: ["Olivia Rodrigo"],
			hidden: ["Disquaires"],
			disabledStores: ["ts_us"],
			removedStores: ["tm_uk"],
			addedStores: {
				"Tate McRae": [{ id: "tm_fr", label: "Store FR", flag: "fr", url: "https://tm.fr" }],
				"Olivia Rodrigo": [{ id: "or_us", label: "US", flag: "us", url: "https://or.com" }],
			},
		});
		assert.deepEqual(json(storage, "customArtists"), [
			{ name: "Niall Horan", initials: "NH", category: "store", profiles: ["Carotte"] },
			{ name: "Olivia Rodrigo", initials: "OR", category: "store", profiles: ["Alex"] },
		]);

		// Résultat visible identique à la v1
		const names = getArtists("Alex").map((a) => a.name);
		assert.equal(names[0], "Olivia Rodrigo");
		assert.ok(!names.includes("Disquaires"));

		// Anciennes clés nettoyées, raccourcis intacts
		const keys = storage.keys();
		assert.ok(
			!keys.some((k) =>
				/^(storeData|disabledStores|artistOrder|displayName|clockVisible|eventsFilter|releaseCache)_/.test(
					k,
				),
			),
		);
		assert.deepEqual(json(storage, "shortcuts_Alex"), [{ name: "YT", url: "https://youtube.com" }]);
	});

	it("ne s'exécute qu'une fois", () => {
		const storage = freshStorage({ schemaVersion: String(SCHEMA_VERSION), storeData_Alex: [] });
		runMigrations();
		assert.equal(storage.getItem("storeData_Alex"), "[]");
	});

	it("fonctionne sur une installation vierge", () => {
		freshStorage();
		runMigrations();
		assert.ok(getArtists("Carotte").length > 0);
	});
});

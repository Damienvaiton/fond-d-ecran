// ---------------------------------------------------------------------------
// Migrations des données stockées dans le navigateur.
// Chaque étape fait passer le schéma d'une version à la suivante ; elles sont
// exécutées une seule fois, au démarrage, avant tout le reste.
// ---------------------------------------------------------------------------

import { DEFAULT_ARTISTS, PROFILE_NAMES } from "../config.js";
import {
	KEYS,
	allKeys,
	readJSON,
	readString,
	removeKey,
	writeJSON,
	writeString,
} from "./storage.js";
import { initialsOf } from "./text.js";

export const SCHEMA_VERSION = 2;

/**
 * v1 → v2
 * - Les artistes/stores n'étaient plus lus depuis le code après le premier
 *   lancement (copie figée dans `storeData_<profil>`). On ne garde plus que
 *   les différences par rapport aux valeurs par défaut (`artistPrefs_<profil>`).
 * - `customArtists` ({ artist, profiles }) devient le registre unique des
 *   artistes ajoutés ({ name, initials, category, profiles }).
 * - Les réglages éparpillés (displayName_, clockVisible_, eventsFilter_…)
 *   sont regroupés dans `settings_<profil>`.
 * - Le cache des pochettes passe d'une clé par jour et par album à une seule clé.
 */
function migrateV1toV2() {
	const customs = new Map();
	for (const old of readJSON(KEYS.customArtists, [])) {
		const name = (old.name ?? old.artist ?? "").trim();
		if (!name) continue;
		customs.set(name, {
			name,
			initials: old.initials || initialsOf(name),
			category: old.category || "store",
			profiles: [...(old.profiles ?? [])],
		});
	}

	for (const user of PROFILE_NAMES) {
		// Réglages
		const settings = {};
		const displayName = readString(`displayName_${user}`);
		if (displayName && displayName !== user) settings.displayName = displayName;
		const clock = readString(`clockVisible_${user}`);
		if (clock !== null) settings.clockVisible = clock === "true";
		if (readString(`eventsFilter_${user}`) === "true") settings.ownEventsOnly = true;
		if (Object.keys(settings).length)
			writeJSON(KEYS.settings(user), {
				...readJSON(KEYS.settings(user), {}),
				...settings,
			});

		// Préférences artistes
		const prefs = {
			order: readJSON(`artistOrder_${user}`, []),
			hidden: [],
			disabledStores: readJSON(`disabledStores_${user}`, []),
			removedStores: [],
			addedStores: {},
		};
		const stored = readJSON(`storeData_${user}`, null);
		if (Array.isArray(stored)) {
			const storedByName = new Map(stored.map((a) => [a.name, a]));
			for (const def of DEFAULT_ARTISTS.filter((a) => a.profiles.includes(user))) {
				const mine = storedByName.get(def.name);
				if (!mine) {
					prefs.hidden.push(def.name);
					continue;
				}
				const defIds = new Set(def.stores.map((s) => s.id));
				const mineIds = new Set((mine.stores ?? []).map((s) => s.id));
				prefs.removedStores.push(...[...defIds].filter((id) => !mineIds.has(id)));
				const added = (mine.stores ?? []).filter((s) => !defIds.has(s.id));
				if (added.length) prefs.addedStores[def.name] = added;
			}
			const defaultNames = new Set(DEFAULT_ARTISTS.map((a) => a.name));
			for (const a of stored.filter((x) => !defaultNames.has(x.name))) {
				const custom = customs.get(a.name) ?? {
					name: a.name,
					initials: a.initials || initialsOf(a.name),
					category: a.category || "store",
					profiles: [],
				};
				if (!custom.profiles.includes(user)) custom.profiles.push(user);
				customs.set(a.name, custom);
				if (a.stores?.length) prefs.addedStores[a.name] = a.stores;
			}
		}
		writeJSON(KEYS.artistPrefs(user), prefs);
	}

	writeJSON(KEYS.customArtists, [...customs.values()]);

	const obsolete =
		/^(storeData|artistOrder|disabledStores|displayName|clockVisible|eventsFilter)_|^releaseCache_/;
	for (const key of allKeys()) if (obsolete.test(key)) removeKey(key);
}

const STEPS = { 1: migrateV1toV2 };

export function runMigrations() {
	// Pas de numéro de version = installation v1, ou tout premier lancement
	let version = Number(readString(KEYS.schemaVersion, "1")) || 1;
	while (version < SCHEMA_VERSION) {
		try {
			STEPS[version]();
		} catch (err) {
			console.error(`[migrations] échec v${version} → v${version + 1}`, err);
			return;
		}
		version += 1;
		writeString(KEYS.schemaVersion, version);
	}
}

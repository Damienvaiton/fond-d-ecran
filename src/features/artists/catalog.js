// ---------------------------------------------------------------------------
// Catalogue d'artistes : source unique pour la barre des stores, l'onglet
// « Artistes » de la configuration et la liste d'artistes des événements.
//
// Liste effective = artistes par défaut (src/config.js)
//                 + artistes ajoutés par l'utilisateur (globaux, liés à des profils)
//                 + préférences du profil (masqués, ordre, stores ajoutés /
//                   supprimés / désactivés).
// Les valeurs par défaut ne sont jamais recopiées dans le stockage : une
// modification de src/config.js est donc visible immédiatement.
// ---------------------------------------------------------------------------

import { DEFAULT_ARTISTS } from "../../config.js";
import { KEYS, readJSON, writeJSON } from "../../core/storage.js";
import { emit } from "../../core/state.js";
import { initialsOf } from "../../core/text.js";
import { inferFlag, normalizeUrl } from "../../core/url.js";

const EMPTY_PREFS = {
	order: [], // noms d'artistes dans l'ordre choisi
	hidden: [], // artistes par défaut retirés de ce profil
	disabledStores: [], // stores masqués de la barre (réactivables)
	removedStores: [], // stores par défaut supprimés
	addedStores: {}, // { [nom d'artiste]: [store] }
};

// --- Lecture / écriture -----------------------------------------------------

function getCustomArtists() {
	return readJSON(KEYS.customArtists, []);
}

function saveCustomArtists(list) {
	writeJSON(KEYS.customArtists, list);
}

function getArtistPrefs(user) {
	const prefs = readJSON(KEYS.artistPrefs(user), {});
	return { ...structuredClone(EMPTY_PREFS), ...prefs };
}

function saveArtistPrefs(user, prefs) {
	writeJSON(KEYS.artistPrefs(user), prefs);
}

function updatePrefs(user, mutate) {
	const prefs = getArtistPrefs(user);
	mutate(prefs);
	saveArtistPrefs(user, prefs);
	emit("artists");
}

// --- Résolution -------------------------------------------------------------

/**
 * Artistes visibles pour un profil, dans l'ordre choisi. Chaque store porte
 * un booléen `enabled`. Fonction pure (les tests l'appellent directement).
 */
export function resolveArtists({
	user,
	defaults = DEFAULT_ARTISTS,
	customArtists = [],
	prefs = EMPTY_PREFS,
}) {
	const defaultNames = new Set(defaults.map((a) => a.name));
	const removed = new Set(prefs.removedStores);
	const disabled = new Set(prefs.disabledStores);

	const visible = [
		...defaults
			.filter((a) => a.profiles.includes(user) && !prefs.hidden.includes(a.name))
			.map((a) => ({ ...a, isCustom: false })),
		...customArtists
			.filter((a) => !defaultNames.has(a.name) && a.profiles?.includes(user))
			.map((a) => ({
				initials: initialsOf(a.name),
				category: "store",
				...a,
				stores: [],
				isCustom: true,
			})),
	].map((artist) => ({
		...artist,
		stores: [...artist.stores, ...(prefs.addedStores[artist.name] ?? [])]
			.filter((s) => !removed.has(s.id))
			.map((s) => ({ ...s, enabled: !disabled.has(s.id) })),
	}));

	const rank = new Map(prefs.order.map((name, i) => [name, i]));
	return visible
		.map((artist, i) => ({ artist, i }))
		.sort(
			(a, b) =>
				(rank.get(a.artist.name) ?? Infinity) - (rank.get(b.artist.name) ?? Infinity) || a.i - b.i,
		)
		.map(({ artist }) => artist);
}

export function getArtists(user) {
	if (!user) return [];
	return resolveArtists({
		user,
		customArtists: getCustomArtists(),
		prefs: getArtistPrefs(user),
	});
}

/**
 * Tous les artistes connus, tous profils confondus : { name, profiles }.
 * Les regroupements de boutiques (« Disquaires », catégorie « Autres »…) sont exclus.
 */
export function getAllArtistNames() {
	const isShopGroup = (a) => a.group || a.category === "autres";
	const all = new Map(
		DEFAULT_ARTISTS.filter((a) => !isShopGroup(a)).map((a) => [a.name, a.profiles]),
	);
	for (const a of getCustomArtists()) {
		if (!all.has(a.name) && !isShopGroup(a)) all.set(a.name, a.profiles ?? []);
	}
	return [...all].map(([name, profiles]) => ({ name, profiles }));
}

// --- Opérations -------------------------------------------------------------

/**
 * Ajoute (ou réaffiche) un artiste pour les profils donnés.
 * Retourne false si l'artiste est déjà visible pour tous ces profils.
 */
export function addArtist({ name, initials, category = "store", profiles }) {
	name = name.trim();
	if (!name || !profiles.length) return false;
	let changed = false;

	const builtIn = DEFAULT_ARTISTS.find((a) => a.name === name);
	if (builtIn) {
		// Artiste par défaut retiré auparavant : on le réaffiche
		for (const user of profiles.filter((p) => builtIn.profiles.includes(p))) {
			const prefs = getArtistPrefs(user);
			if (prefs.hidden.includes(name)) {
				prefs.hidden = prefs.hidden.filter((n) => n !== name);
				saveArtistPrefs(user, prefs);
				changed = true;
			}
		}
	} else {
		const customs = getCustomArtists();
		const existing = customs.find((a) => a.name === name);
		if (existing) {
			const missing = profiles.filter((p) => !existing.profiles.includes(p));
			existing.profiles.push(...missing);
			changed = missing.length > 0;
		} else {
			customs.push({
				name,
				initials: (initials || initialsOf(name)).toUpperCase().slice(0, 2),
				category,
				profiles: [...profiles],
			});
			changed = true;
		}
		saveCustomArtists(customs);
	}

	if (changed) emit("artists");
	return changed;
}

/** Retire un artiste du profil (sans toucher aux autres profils). */
export function removeArtist(user, name) {
	if (DEFAULT_ARTISTS.some((a) => a.name === name)) {
		updatePrefs(user, (prefs) => {
			if (!prefs.hidden.includes(name)) prefs.hidden.push(name);
		});
		return;
	}
	const customs = getCustomArtists()
		.map((a) => (a.name === name ? { ...a, profiles: a.profiles.filter((p) => p !== user) } : a))
		.filter((a) => a.profiles.length > 0);
	saveCustomArtists(customs);
	updatePrefs(user, (prefs) => delete prefs.addedStores[name]);
}

export function addStore(user, artistName, { label, url }) {
	label = label.trim();
	url = normalizeUrl(url);
	if (!label || !url) return null;
	const store = {
		id: `custom_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
		label,
		flag: inferFlag(url),
		url,
	};
	updatePrefs(user, (prefs) => {
		(prefs.addedStores[artistName] ??= []).push(store);
	});
	return store;
}

export function removeStore(user, artistName, storeId) {
	updatePrefs(user, (prefs) => {
		const added = prefs.addedStores[artistName] ?? [];
		if (added.some((s) => s.id === storeId)) {
			prefs.addedStores[artistName] = added.filter((s) => s.id !== storeId);
		} else if (!prefs.removedStores.includes(storeId)) {
			prefs.removedStores.push(storeId);
		}
		prefs.disabledStores = prefs.disabledStores.filter((id) => id !== storeId);
	});
}

export function setStoresEnabled(user, storeIds, enabled) {
	updatePrefs(user, (prefs) => {
		const disabled = new Set(prefs.disabledStores);
		for (const id of storeIds) enabled ? disabled.delete(id) : disabled.add(id);
		prefs.disabledStores = [...disabled];
	});
}

export function setArtistOrder(user, names) {
	updatePrefs(user, (prefs) => {
		prefs.order = names;
	});
}

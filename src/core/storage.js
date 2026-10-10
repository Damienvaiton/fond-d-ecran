// ---------------------------------------------------------------------------
// Accès au localStorage : lecture/écriture JSON tolérantes aux erreurs
// (quota dépassé, données corrompues, stockage indisponible…).
// ---------------------------------------------------------------------------

let backend = globalThis.localStorage;

/** Remplace le stockage sous-jacent (utilisé par les tests). */
export function setStorageBackend(storage) {
	backend = storage;
}

/** Toutes les clés de stockage de l'application, au même endroit. */
export const KEYS = {
	schemaVersion: "schemaVersion",
	currentUser: "currentUser",
	searchHistory: "searchHistory",
	customArtists: "customArtists",
	customEvents: "customEvents",
	releaseCache: "releaseCache",
	shortcuts: (user) => `shortcuts_${user}`,
	settings: (user) => `settings_${user}`,
	artistPrefs: (user) => `artistPrefs_${user}`,
};

export function readString(key, fallback = null) {
	try {
		const value = backend.getItem(key);
		return value === null ? fallback : value;
	} catch {
		return fallback;
	}
}

export function writeString(key, value) {
	try {
		backend.setItem(key, String(value));
		return true;
	} catch (err) {
		console.warn(`[storage] écriture impossible (${key})`, err);
		return false;
	}
}

export function readJSON(key, fallback) {
	const raw = readString(key);
	if (raw === null) return fallback;
	try {
		return JSON.parse(raw) ?? fallback;
	} catch {
		return fallback;
	}
}

export function writeJSON(key, value) {
	return writeString(key, JSON.stringify(value));
}

export function removeKey(key) {
	try {
		backend.removeItem(key);
	} catch {
		/* stockage indisponible : rien à faire */
	}
}

export function allKeys() {
	try {
		return Array.from({ length: backend.length }, (_, i) => backend.key(i));
	} catch {
		return [];
	}
}

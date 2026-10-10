// ---------------------------------------------------------------------------
// Réglages par profil
// ---------------------------------------------------------------------------

import { KEYS, readJSON, writeJSON } from "./storage.js";
import { emit } from "./state.js";

const DEFAULT_SETTINGS = {
	displayName: null, // nom affiché (sinon le nom du profil)
	clockVisible: true,
	ownEventsOnly: false, // n'afficher que les événements liés à ce profil
};

export function getSettings(user) {
	return { ...DEFAULT_SETTINGS, ...readJSON(KEYS.settings(user), {}) };
}

export function updateSettings(user, patch) {
	writeJSON(KEYS.settings(user), { ...getSettings(user), ...patch });
	emit("settings", user);
}

export function displayName(user) {
	return getSettings(user).displayName || user;
}

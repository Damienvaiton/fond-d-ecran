// ---------------------------------------------------------------------------
// Événements : chargement de data/events.json + sorties ajoutées dans
// l'interface (localStorage), export du tout en un nouvel events.json.
// ---------------------------------------------------------------------------

import { downloadFile } from "../../core/dom.js";
import { getSettings } from "../../core/settings.js";
import { emit } from "../../core/state.js";
import { KEYS, readJSON, writeJSON } from "../../core/storage.js";
import { filterForProfile, flattenGroups, mergeGroups } from "./model.js";

const EVENTS_URL = "data/events.json";

let baseGroups = [];
let groups = [];
let events = [];

function rebuild() {
	groups = mergeGroups(baseGroups, readJSON(KEYS.customEvents, []));
	events = flattenGroups(groups);
}

export async function loadEvents() {
	try {
		const res = await fetch(EVENTS_URL);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		baseGroups = await res.json();
	} catch (err) {
		console.error(`[events] impossible de charger ${EVENTS_URL}`, err);
		baseGroups = [];
	}
	rebuild();
	emit("events");
}

/** Événements à afficher pour ce profil (selon le réglage « mes événements »). */
export function getEventsFor(user) {
	if (!user) return [];
	return filterForProfile(events, user, getSettings(user).ownEventsOnly);
}

/** Artistes présents dans les événements : [{ name, profiles }]. */
export function getEventArtists() {
	return groups.map((g) => ({ name: g.artist, profiles: g.profiles }));
}

export function addRelease({ artist, profiles }, release) {
	const custom = readJSON(KEYS.customEvents, []);
	const group = custom.find((g) => g.artist === artist);
	if (group) group.discography.push(release);
	else custom.push({ artist, profiles, discography: [release] });
	writeJSON(KEYS.customEvents, custom);
	rebuild();
	emit("events");
}

/** Télécharge events.json (base + ajouts) pour remplacer data/events.json. */
export function exportEvents() {
	downloadFile("events.json", `${JSON.stringify(groups, null, 4)}\n`);
}

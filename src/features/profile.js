// ---------------------------------------------------------------------------
// Sélection du profil
// ---------------------------------------------------------------------------

import { PROFILES, PROFILE_NAMES } from "../config.js";
import { $, h } from "../core/dom.js";
import { createModal } from "../core/modal.js";
import { displayName } from "../core/settings.js";
import { getUser, on, setUser } from "../core/state.js";
import { KEYS, readString, writeString } from "../core/storage.js";

let modal;

export function initProfileSelector() {
	// Sans profil chargé, impossible de fermer le sélecteur
	modal = createModal("user-selector", { dismissible: () => getUser() !== null });
	$("#switch-profile-btn").addEventListener("click", openSelector);
	on("settings", renderButtons); // un nom d'affichage a pu changer
}

function renderButtons() {
	$("#user-selector .user-buttons").replaceChildren(
		...PROFILE_NAMES.map((name) =>
			h("button", {
				type: "button",
				className: `btn ${name === getUser() ? "btn-primary" : "btn-light"}`,
				text: displayName(name),
				on: { click: () => selectProfile(name) },
			}),
		),
	);
}

function openSelector() {
	renderButtons();
	modal.open();
}

function selectProfile(name) {
	writeString(KEYS.currentUser, name);
	modal.close();
	setUser(name);
}

/** Restaure le dernier profil utilisé, sinon affiche le sélecteur. */
export function restoreProfile() {
	const saved = readString(KEYS.currentUser);
	if (saved && PROFILES[saved]) setUser(saved);
	else openSelector();
}

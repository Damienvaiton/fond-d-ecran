// ---------------------------------------------------------------------------
// Modale de configuration : onglet Profil (nom, affichage, export) et onglet
// Artistes.
// ---------------------------------------------------------------------------

import { $, $$, flashError } from "../core/dom.js";
import { createModal, onEnter } from "../core/modal.js";
import { displayName, getSettings, updateSettings } from "../core/settings.js";
import { getUser } from "../core/state.js";
import { initArtistsPanel, renderArtistsPanel } from "./artists/settings-panel.js";
import { exportEvents } from "./events/repository.js";

let modal;

export function initConfigDialog() {
	modal = createModal("config-modal");
	initArtistsPanel();

	$("#config-btn").addEventListener("click", open);

	$(".config-tabs", modal.el).addEventListener("click", (e) => {
		const tab = e.target.closest(".config-tab");
		if (tab) showTab(tab.dataset.tab);
	});

	const nameInput = $("#config-profile-name");
	const saveBtn = $("#config-save-name");
	const saveName = () => {
		const name = nameInput.value.trim();
		if (!name) return flashError(nameInput);
		updateSettings(getUser(), { displayName: name === getUser() ? null : name });
		saveBtn.textContent = "✓ Enregistré";
		setTimeout(() => (saveBtn.textContent = "Enregistrer"), 1500);
	};
	saveBtn.addEventListener("click", saveName);
	onEnter([nameInput], saveName);

	$("#toggle-clock").addEventListener("change", (e) =>
		updateSettings(getUser(), { clockVisible: e.target.checked }),
	);
	$("#toggle-events-filter").addEventListener("change", (e) =>
		updateSettings(getUser(), { ownEventsOnly: e.target.checked }),
	);
	$("#export-events-btn").addEventListener("click", exportEvents);
}

function open() {
	const user = getUser();
	if (!user) return;
	const settings = getSettings(user);
	$("#config-profile-name").value = displayName(user);
	$("#toggle-clock").checked = settings.clockVisible;
	$("#toggle-events-filter").checked = settings.ownEventsOnly;
	showTab("profil");
	modal.open();
}

function showTab(name) {
	for (const tab of $$(".config-tab", modal.el)) {
		const active = tab.dataset.tab === name;
		tab.classList.toggle("active", active);
		tab.setAttribute("aria-selected", active);
	}
	for (const panel of $$(".config-tab-content", modal.el))
		panel.classList.toggle("hidden", panel.id !== `tab-${name}`);
	if (name === "artistes") renderArtistsPanel();
}

// ---------------------------------------------------------------------------
// Onglet « Artistes » de la configuration : ajout/suppression d'artistes et
// de stores, activation, réordonnancement par glisser-déposer.
// ---------------------------------------------------------------------------

import { ARTIST_CATEGORIES } from "../../config.js";
import { $, $$, flashError, h } from "../../core/dom.js";
import { createDropdown } from "../../core/dropdown.js";
import { getUser, on } from "../../core/state.js";
import { isHttpUrl, normalizeUrl } from "../../core/url.js";
import {
	addArtist,
	addStore,
	getArtists,
	removeArtist,
	removeStore,
	setArtistOrder,
	setStoresEnabled,
} from "./catalog.js";
import { applyArtistPhoto } from "./sidebar.js";

let panel;
let list;
const expanded = new Set(); // artistes dépliés, conservés entre deux rendus

export function initArtistsPanel() {
	panel = $("#tab-artistes");
	panel.replaceChildren(newArtistForm(), (list = h("div", { className: "artists-config-list" })));
	initReorder();
	on("artists", () => {
		if (!panel.classList.contains("hidden")) renderArtistsPanel();
	});
}

export function renderArtistsPanel() {
	const artists = getArtists(getUser());
	const byCategory = Map.groupBy(artists, (a) => a.category ?? "store");
	list.replaceChildren(
		...[...byCategory].flatMap(([category, items]) => [
			h("div", {
				className: "artists-config-category",
				text: ARTIST_CATEGORIES[category] ?? category,
			}),
			...items.map(artistBlock),
		]),
	);
}

// --- Formulaire « Nouvel artiste » ---------------------------------------------

function newArtistForm() {
	const nameInput = h("input", {
		type: "text",
		className: "input artists-new-name",
		placeholder: "Nom de l'artiste",
		autocomplete: "off",
		spellcheck: false,
	});
	const initialsInput = h("input", {
		type: "text",
		className: "input artists-new-initials",
		placeholder: "XX",
		maxLength: 2,
		title: "Initiales (facultatif)",
	});
	const category = createDropdown({
		options: Object.entries(ARTIST_CATEGORIES).map(([value, label]) => ({ value, label })),
		placeholder: "Catégorie",
	});
	category.setValue("store");

	const submit = () => {
		const name = nameInput.value.trim();
		if (!name) return flashError(nameInput);
		// Marqué déplié avant l'ajout (qui déclenche le rendu) : on peut
		// ajouter ses stores tout de suite
		const wasExpanded = expanded.has(name);
		expanded.add(name);
		const added = addArtist({
			name,
			initials: initialsInput.value.trim(),
			category: category.value,
			profiles: [getUser()],
		});
		if (!added) {
			if (!wasExpanded) expanded.delete(name);
			return flashError(nameInput); // déjà présent
		}
		nameInput.value = "";
		initialsInput.value = "";
	};

	nameInput.addEventListener("keydown", (e) => e.key === "Enter" && submit());

	return h(
		"div",
		{ className: "artists-new" },
		h("div", { className: "artists-config-category", text: "Nouvel artiste" }),
		h(
			"div",
			{ className: "artists-new-row" },
			nameInput,
			initialsInput,
			category.el,
			h("button", {
				className: "btn btn-primary btn-sm",
				type: "button",
				text: "+ Ajouter",
				on: { click: submit },
			}),
		),
	);
}

// --- Bloc artiste -------------------------------------------------------------

function toggle(checked, onChange, { small = false, indeterminate = false, label }) {
	const input = h("input", {
		type: "checkbox",
		checked,
		indeterminate,
		attrs: { "aria-label": label },
		on: { change: () => onChange(input.checked) },
	});
	return h(
		"label",
		{ className: `toggle-switch${small ? " toggle-switch-sm" : ""}`, title: label },
		input,
		h("span", { className: "toggle-slider" }),
	);
}

function iconButton(text, title, onClick) {
	return h("button", {
		className: "icon-btn",
		type: "button",
		text,
		title,
		attrs: { "aria-label": title },
		on: { click: onClick },
	});
}

function artistBlock(artist) {
	const user = getUser();
	const storeIds = artist.stores.map((s) => s.id);
	const enabledCount = artist.stores.filter((s) => s.enabled).length;
	const isExpanded = expanded.has(artist.name);

	const badge = h("span", { className: "artists-config-initials", text: artist.initials });
	applyArtistPhoto(badge, artist.name);

	const stores = h(
		"div",
		{ className: `artists-config-stores${isExpanded ? "" : " hidden"}` },
		...artist.stores.map((store) =>
			h(
				"div",
				{ className: "artists-config-store-row" },
				h(
					"span",
					{ className: "artists-config-store-label" },
					h("img", {
						className: "store-flag-mini",
						src: `assets/flags/${store.flag}.png`,
						alt: "",
					}),
					store.label,
				),
				toggle(store.enabled, (enabled) => setStoresEnabled(user, [store.id], enabled), {
					small: true,
					label: `Afficher ${store.label}`,
				}),
				iconButton("🗑", "Supprimer ce store", () => {
					if (confirm(`Supprimer le store « ${store.label} » ?`))
						removeStore(user, artist.name, store.id);
				}),
			),
		),
		addStoreForm(artist),
	);

	const expandBtn = iconButton(isExpanded ? "▾" : "▸", "Voir les stores", () => {
		const nowHidden = stores.classList.toggle("hidden");
		expandBtn.textContent = nowHidden ? "▸" : "▾";
		nowHidden ? expanded.delete(artist.name) : expanded.add(artist.name);
	});

	return h(
		"div",
		{ className: "artists-config-artist", draggable: true, dataset: { name: artist.name } },
		h(
			"div",
			{ className: "artists-config-artist-header" },
			h(
				"div",
				{ className: "artists-config-artist-info" },
				h("span", {
					className: "artists-config-drag-handle",
					text: "⠿",
					title: "Glisser pour réordonner",
				}),
				badge,
				h("span", { className: "artists-config-name", text: artist.name }),
			),
			storeIds.length
				? toggle(enabledCount > 0, (enabled) => setStoresEnabled(user, storeIds, enabled), {
						indeterminate: enabledCount > 0 && enabledCount < storeIds.length,
						label: `Afficher ${artist.name}`,
					})
				: null,
			expandBtn,
			iconButton("🗑", "Retirer cet artiste", () => {
				if (confirm(`Retirer l'artiste « ${artist.name} » de ce profil ?`)) {
					expanded.delete(artist.name);
					removeArtist(user, artist.name);
				}
			}),
		),
		stores,
	);
}

function addStoreForm(artist) {
	const labelInput = h("input", {
		type: "text",
		className: "input",
		placeholder: "Nom (ex : Store France)",
		autocomplete: "off",
	});
	const urlInput = h("input", {
		type: "text",
		className: "input",
		placeholder: "URL",
		autocomplete: "off",
		spellcheck: false,
	});
	const form = h("div", { className: "artists-add-store-form hidden" });

	const submit = () => {
		const url = normalizeUrl(urlInput.value);
		if (!labelInput.value.trim()) return flashError(labelInput);
		if (!isHttpUrl(url)) return flashError(urlInput);
		addStore(getUser(), artist.name, { label: labelInput.value, url });
	};
	for (const input of [labelInput, urlInput])
		input.addEventListener("keydown", (e) => e.key === "Enter" && submit());

	form.append(
		labelInput,
		urlInput,
		h("button", {
			className: "btn btn-primary btn-sm",
			type: "button",
			text: "Ajouter",
			on: { click: submit },
		}),
	);

	return h(
		"div",
		{ className: "artists-add-store" },
		h("button", {
			className: "btn btn-ghost btn-sm btn-block",
			type: "button",
			text: "+ Ajouter un store",
			on: {
				click: () => {
					form.classList.toggle("hidden");
					if (!form.classList.contains("hidden")) labelInput.focus();
				},
			},
		}),
		form,
	);
}

// --- Réordonnancement (délégation, posée une seule fois) ------------------------

function initReorder() {
	let dragged = null;
	const blocks = () => $$(".artists-config-artist", list);

	list.addEventListener("dragstart", (e) => {
		dragged = e.target.closest?.(".artists-config-artist");
		if (!dragged) return;
		dragged.classList.add("artist-dragging");
		e.dataTransfer.effectAllowed = "move";
	});
	list.addEventListener("dragover", (e) => {
		const target = e.target.closest(".artists-config-artist");
		if (!dragged || !target) return;
		e.preventDefault();
		if (target === dragged) return;
		const { top, height } = target.getBoundingClientRect();
		e.clientY < top + height / 2 ? target.before(dragged) : target.after(dragged);
	});
	list.addEventListener("drop", (e) => e.preventDefault());
	list.addEventListener("dragend", () => {
		if (!dragged) return;
		dragged.classList.remove("artist-dragging");
		dragged = null;
		setArtistOrder(
			getUser(),
			blocks().map((b) => b.dataset.name),
		);
	});
}

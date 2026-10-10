// ---------------------------------------------------------------------------
// Modale « Ajouter un événement » (sortie d'album ou d'EP).
// La liste d'artistes est celle du catalogue unifié + ceux de events.json ;
// un artiste créé ici apparaît aussi dans l'onglet Artistes, et inversement.
// ---------------------------------------------------------------------------

import { PROFILE_NAMES } from "../../config.js";
import { FRENCH_MONTHS, isValidDate } from "../../core/dates.js";
import { $, $$, flashError, h } from "../../core/dom.js";
import { createDropdown } from "../../core/dropdown.js";
import { createModal, onEnter } from "../../core/modal.js";
import { getUser } from "../../core/state.js";
import { addArtist, getAllArtistNames } from "../artists/catalog.js";
import { addRelease, getEventArtists } from "./repository.js";

const NEW_ARTIST = Symbol("new-artist");

let modal;
let artistPicker;
let monthPicker;
let artists = []; // [{ name, profiles }]
let selectedType = null;

export function initAddEventDialog() {
	modal = createModal("add-event-modal");

	artistPicker = createDropdown({
		options: [],
		placeholder: "Choisir un artiste…",
		onSelect: (value) => {
			if (value === NEW_ARTIST) openNewArtistPanel();
			else $("#event-new-artist").classList.add("hidden");
		},
	});
	$("#event-artist-slot").replaceWith(artistPicker.el);

	monthPicker = createDropdown({
		options: FRENCH_MONTHS.map((label, i) => ({ value: i + 1, label })),
		placeholder: "Mois",
		direction: "up",
	});
	$("#event-month-slot").replaceWith(monthPicker.el);

	$("#event-type").addEventListener("click", (e) => {
		const btn = e.target.closest("[data-type]");
		if (btn) selectType(btn.dataset.type);
	});

	initNewArtistPanel();

	$("#add-event-btn").addEventListener("click", open);
	$("#add-event-confirm").addEventListener("click", submit);
	onEnter([$("#event-name"), $("#event-label"), $("#event-day"), $("#event-year")], submit);
}

function refreshArtists() {
	const byName = new Map();
	for (const a of [...getEventArtists(), ...getAllArtistNames()])
		if (!byName.has(a.name)) byName.set(a.name, a);
	artists = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, "fr"));
	artistPicker.setOptions([
		...artists.map((a) => ({ value: a.name, label: a.name })),
		{
			value: NEW_ARTIST,
			label: "＋ Nouvel artiste",
			className: "dropdown-option--action",
			action: true,
		},
	]);
}

function open() {
	refreshArtists();
	artistPicker.setValue(null);
	monthPicker.setValue(null);
	selectType(null);
	for (const id of ["event-name", "event-label", "event-day", "event-year"]) $(`#${id}`).value = "";
	$("#event-new-artist").classList.add("hidden");
	modal.open();
}

function selectType(type) {
	selectedType = type;
	for (const btn of $$("#event-type [data-type]"))
		btn.classList.toggle("active", btn.dataset.type === type);
}

// --- Création d'un artiste depuis la modale ---------------------------------------

function initNewArtistPanel() {
	$("#event-new-artist-profiles").replaceChildren(
		...PROFILE_NAMES.map((profile) =>
			h(
				"label",
				{},
				h("input", { type: "checkbox", value: profile, checked: true }),
				` ${profile}`,
			),
		),
	);
	const nameInput = $("#event-new-artist-name");
	const create = () => {
		const name = nameInput.value.trim();
		const profiles = $$("#event-new-artist-profiles input:checked").map((cb) => cb.value);
		if (!name) return flashError(nameInput);
		if (!profiles.length) return flashError($("#event-new-artist-profiles"));
		addArtist({ name, profiles });
		refreshArtists();
		artistPicker.setValue(name);
		$("#event-new-artist").classList.add("hidden");
	};
	$("#event-new-artist-add").addEventListener("click", create);
	onEnter([nameInput], create);
}

function openNewArtistPanel() {
	$("#event-new-artist").classList.remove("hidden");
	$("#event-new-artist-name").value = "";
	$("#event-new-artist-name").focus();
}

// --- Validation et enregistrement -------------------------------------------------

function submit() {
	const name = $("#event-name").value.trim();
	const label = $("#event-label").value.trim() || null;
	const day = Number($("#event-day").value);
	const month = monthPicker.value;
	const year = Number($("#event-year").value);
	const artist = artists.find((a) => a.name === artistPicker.value);

	const checks = [
		[!!artist, artistPicker.trigger],
		[!!selectedType, $("#event-type")],
		[!!name, $("#event-name")],
		[Number.isInteger(day) && day >= 1 && day <= 31, $("#event-day")],
		[!!month, monthPicker.trigger],
		[Number.isInteger(year) && year >= 1950 && year <= 2099, $("#event-year")],
	];
	const invalid = checks.filter(([ok]) => !ok);
	invalid.forEach(([, el]) => flashError(el));
	if (invalid.length) return;
	if (!isValidDate(day, month, year)) return flashError($("#event-day")); // ex. 31/02

	addRelease(
		{ artist: artist.name, profiles: artist.profiles.length ? artist.profiles : [getUser()] },
		{ name, type: selectedType, label, release_date: { day, month, year } },
	);
	modal.close();
}

// ---------------------------------------------------------------------------
// Barre de recherche Google + historique des recherches.
// ---------------------------------------------------------------------------

import { $, h } from "../core/dom.js";
import { on } from "../core/state.js";
import { KEYS, readJSON, writeJSON } from "../core/storage.js";

const MAX_ENTRIES = 12;

const HISTORY_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6a7 7 0 1 1 2.06 4.94L6.63 18.37A9 9 0 1 0 13 3z"/></svg>`;

// --- Historique ---------------------------------------------------------------

const getHistory = () => readJSON(KEYS.searchHistory, []);
const saveHistory = (history) => writeJSON(KEYS.searchHistory, history);

function remember(query) {
	query = query.trim();
	if (!query) return;
	const others = getHistory().filter((q) => q.toLowerCase() !== query.toLowerCase());
	saveHistory([query, ...others].slice(0, MAX_ENTRIES));
}

const forget = (query) => saveHistory(getHistory().filter((q) => q !== query));

// --- Interface ----------------------------------------------------------------

let input;
let form;
let dropdown;
let activeIndex = -1;

export function initSearch() {
	input = $("#search-input");
	form = input.closest("form");
	dropdown = $("#search-history");

	form.addEventListener("submit", () => remember(input.value));
	input.addEventListener("focus", renderDropdown);
	input.addEventListener("input", renderDropdown);
	input.addEventListener("keydown", onKeydown);
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".search-container")) closeDropdown();
	});
	on("profile", () => input.focus());
}

/** Met en gras la partie qui correspond au filtre. */
function highlighted(query, filter) {
	const start = filter ? query.toLowerCase().indexOf(filter.toLowerCase()) : -1;
	if (start < 0) return [query];
	const end = start + filter.length;
	return [query.slice(0, start), h("mark", { text: query.slice(start, end) }), query.slice(end)];
}

function renderDropdown() {
	const filter = input.value.trim();
	const matches = getHistory().filter((q) => q.toLowerCase().includes(filter.toLowerCase()));
	if (!matches.length) return closeDropdown();
	activeIndex = -1;

	dropdown.replaceChildren(
		...matches.map((query) =>
			h(
				"div",
				{
					className: "search-history-item",
					attrs: { role: "option" },
					dataset: { query },
					on: {
						mousedown: (e) => {
							e.preventDefault(); // garde le focus dans le champ
							input.value = query;
							closeDropdown();
							form.requestSubmit(); // déclenche "submit" → historique à jour
						},
					},
				},
				h("span", { className: "search-history-icon", html: HISTORY_ICON }),
				h("span", { className: "search-history-text" }, ...highlighted(query, filter)),
				h("button", {
					className: "search-history-delete",
					type: "button",
					text: "✕",
					title: "Supprimer de l'historique",
					on: {
						// Intercepté ici : sinon le mousedown remonte à l'entrée et lance la recherche
						mousedown: (e) => {
							e.preventDefault();
							e.stopPropagation();
						},
						click: (e) => {
							e.stopPropagation();
							forget(query);
							renderDropdown();
						},
					},
				}),
			),
		),
		matches.length > 1
			? h("div", {
					className: "search-history-clear-all",
					text: "Tout effacer",
					on: {
						mousedown: (e) => {
							e.preventDefault();
							saveHistory([]);
							closeDropdown();
						},
					},
				})
			: null,
	);
	dropdown.classList.remove("hidden");
}

function closeDropdown() {
	dropdown.classList.add("hidden");
	activeIndex = -1;
}

function onKeydown(e) {
	const items = [...dropdown.querySelectorAll(".search-history-item")];
	if (dropdown.classList.contains("hidden") || !items.length) return;

	if (e.key === "ArrowDown" || e.key === "ArrowUp") {
		e.preventDefault();
		const delta = e.key === "ArrowDown" ? 1 : -1;
		activeIndex = Math.max(-1, Math.min(items.length - 1, activeIndex + delta));
		items.forEach((el, i) => el.classList.toggle("active", i === activeIndex));
		if (activeIndex >= 0) input.value = items[activeIndex].dataset.query;
	} else if (e.key === "Escape") {
		closeDropdown();
	}
}

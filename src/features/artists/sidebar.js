// ---------------------------------------------------------------------------
// Barre latérale des artistes : avatar + menu des stores actifs.
// ---------------------------------------------------------------------------

import { artistPhoto } from "../../core/assets.js";
import { $, $$, h } from "../../core/dom.js";
import { getUser, on } from "../../core/state.js";
import { getArtists } from "./catalog.js";

let container;

export function initArtistSidebar() {
	container = $("#artist-stores");
	document.addEventListener("click", closeAll);
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeAll();
	});
	on("profile", render);
	on("artists", render);
}

function closeAll() {
	$$(".artist-pill.open", container).forEach((p) => p.classList.remove("open"));
}

/** Remplace les initiales par la photo de l'artiste, s'il en a une. */
export function applyArtistPhoto(el, name) {
	const photo = artistPhoto(name);
	if (!photo) return;
	el.style.backgroundImage = `url("${photo}")`;
	el.classList.add("has-photo");
}

function render() {
	const artists = getArtists(getUser())
		.map((artist) => ({ artist, stores: artist.stores.filter((s) => s.enabled) }))
		.filter(({ stores }) => stores.length > 0)
		// Regroupe par catégorie en gardant l'ordre choisi à l'intérieur
		.sort((a, b) => categoryRank(a.artist) - categoryRank(b.artist));

	container.replaceChildren(...artists.map(({ artist, stores }) => pill(artist, stores)));
}

const categoryRank = (artist) => (artist.category === "autres" ? 1 : 0);

function pill(artist, stores) {
	const avatar = h("div", { className: "artist-avatar", text: artist.initials });
	applyArtistPhoto(avatar, artist.name);

	const el = h(
		"div",
		{
			className: "artist-pill",
			on: {
				click: (e) => {
					e.stopPropagation();
					const wasOpen = el.classList.contains("open");
					closeAll();
					el.classList.toggle("open", !wasOpen);
				},
			},
		},
		avatar,
		h("div", { className: "artist-label", text: artist.name }),
		h(
			"div",
			{ className: "store-dropdown" },
			h(
				"div",
				{ className: "dropdown-header" },
				h("span", { className: "dropdown-title", text: artist.name }),
				h("button", {
					className: "open-all-btn",
					type: "button",
					text: "Tout ouvrir",
					on: {
						click: (e) => {
							e.stopPropagation();
							stores.forEach((s) => window.open(s.url, "_blank", "noopener"));
						},
					},
				}),
			),
			...stores.map((store) =>
				h(
					"a",
					{
						className: "store-link",
						href: store.url,
						target: "_blank",
						rel: "noopener noreferrer",
						on: { click: (e) => e.stopPropagation() },
					},
					h("img", {
						className: "store-flag",
						src: `assets/flags/${store.flag}.png`,
						alt: "",
					}),
					h("span", { className: "store-label", text: store.label }),
					h("span", { className: "store-arrow", text: "→" }),
				),
			),
		),
	);
	return el;
}

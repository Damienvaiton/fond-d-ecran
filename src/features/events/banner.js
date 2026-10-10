// ---------------------------------------------------------------------------
// Bandeau bas : sorties du jour (carte avec pochette), sinon carrousel des
// anniversaires du jour puis de ceux des 3 prochains jours.
// ---------------------------------------------------------------------------

import { $, h } from "../../core/dom.js";
import { getUser, on } from "../../core/state.js";
import {
	anniversariesOn,
	anniversarySoonText,
	anniversaryText,
	releaseTodayText,
	releasesOn,
	upcomingAnniversaries,
} from "./model.js";
import { fetchReleaseMeta } from "./release-meta.js";
import { getEventsFor } from "./repository.js";

const AUTOPLAY_MS = 6000;
const UPCOMING_DAYS = 3;

const SPOTIFY_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.759-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.224-2.723a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 0 1 .257 1.072zm.105-2.835C14.692 9.15 9.375 8.977 6.297 9.92a.937.937 0 1 1-.543-1.794c3.532-1.072 9.404-.865 13.115 1.338a.937.937 0 0 1-.954 1.402z"/></svg>`;

let banner;
let autoplay = null;
let renderToken = 0; // invalide les rendus asynchrones devenus obsolètes

export function initBanner() {
	banner = $("#event-banner");
	for (const evt of ["profile", "events", "settings", "day"]) on(evt, render);
}

function reset() {
	clearInterval(autoplay);
	autoplay = null;
	banner.replaceChildren();
	banner.classList.remove("has-release");
}

async function render() {
	const token = ++renderToken;
	const events = getEventsFor(getUser());
	const today = new Date();

	const releases = releasesOn(events, today);
	if (releases.length) {
		const cards = await Promise.all(releases.map(buildReleaseCard));
		if (token !== renderToken) return;
		reset();
		banner.classList.add("has-release");
		showCarousel(cards, { wrapperClass: "release-carousel", dots: false });
		return;
	}

	reset();
	const slides = [
		...anniversariesOn(events, today).map((e) => slide(anniversaryText(e, today))),
		...upcomingAnniversaries(events, today, UPCOMING_DAYS).map(({ event, date, daysLeft }) =>
			slide(anniversarySoonText(event, date), daysLeft === 1 ? "Demain" : `Dans ${daysLeft} jours`),
		),
	];
	if (!slides.length) {
		banner.classList.add("hidden");
		return;
	}
	showCarousel(slides, { wrapperClass: "banner-carousel", dots: true });
}

function slide(text, when = null) {
	return h(
		"div",
		{ className: "banner-slide" },
		when && h("span", { className: "banner-when", text: when }),
		h("span", { className: "banner-text", text }),
	);
}

/** Affiche un ou plusieurs éléments ; à partir de deux, ajoute la navigation. */
function showCarousel(items, { wrapperClass, dots }) {
	banner.classList.remove("hidden");
	if (items.length === 1) {
		banner.append(items[0]);
		return;
	}

	let index = 0;
	const slot = h("div", { className: "carousel-slot" });
	const dotsEl = dots ? h("div", { className: "banner-dots" }) : null;
	const show = (i) => {
		index = (i + items.length) % items.length;
		slot.replaceChildren(items[index]);
		dotsEl?.replaceChildren(
			...items.map((_, j) => h("span", { className: `banner-dot${j === index ? " active" : ""}` })),
		);
	};
	const nav = (label, delta) =>
		h("button", {
			className: "carousel-nav",
			type: "button",
			text: delta < 0 ? "‹" : "›",
			title: label,
			attrs: { "aria-label": label },
			on: {
				click: (e) => {
					e.stopPropagation();
					show(index + delta);
					restartAutoplay();
				},
			},
		});
	const restartAutoplay = () => {
		clearInterval(autoplay);
		autoplay = setInterval(() => show(index + 1), AUTOPLAY_MS);
	};

	banner.append(
		h(
			"div",
			{ className: wrapperClass },
			nav("Précédent", -1),
			h("div", { className: "carousel-body" }, slot, dotsEl),
			nav("Suivant", +1),
		),
	);
	show(0);
	restartAutoplay();
}

async function buildReleaseCard(event) {
	const meta = await fetchReleaseMeta(event.artist, event.release);
	if (!meta) {
		return h(
			"div",
			{ className: "release-card release-card--fallback" },
			h("span", { text: releaseTodayText(event) }),
		);
	}
	return h(
		"div",
		{ className: "release-card" },
		h("img", { className: "release-card-art", src: meta.artwork, alt: "" }),
		h(
			"div",
			{ className: "release-card-body" },
			h("span", { className: "release-card-badge", text: "Sortie aujourd'hui" }),
			h("span", { className: "release-card-album", text: meta.album }),
			h("span", { className: "release-card-artist", text: meta.artist }),
		),
		h("a", {
			className: "release-card-spotify",
			href: meta.spotifyUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			title: "Écouter sur Spotify",
			html: SPOTIFY_ICON,
		}),
	);
}

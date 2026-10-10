// ---------------------------------------------------------------------------
// Compte à rebours sous l'horloge : prochaine sortie à venir.
// ---------------------------------------------------------------------------

import { $, h } from "../../core/dom.js";
import { getUser, on } from "../../core/state.js";
import { nextRelease, upcomingReleaseText } from "./model.js";
import { getEventsFor } from "./repository.js";

export function initCountdown() {
	for (const evt of ["profile", "events", "settings", "day"]) on(evt, render);
}

function render() {
	const container = $("#event-countdown");
	const next = nextRelease(getEventsFor(getUser()));
	container.classList.toggle("hidden", !next);
	if (!next) return;

	container.replaceChildren(
		h("div", {
			className: "countdown-days",
			text: next.daysLeft === 1 ? "Demain" : `J-${next.daysLeft}`,
		}),
		h("div", { className: "countdown-sep" }),
		h("div", { className: "countdown-text", text: upcomingReleaseText(next.event) }),
	);
}

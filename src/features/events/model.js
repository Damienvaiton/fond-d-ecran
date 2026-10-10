// ---------------------------------------------------------------------------
// Modèle des événements (sorties d'albums/EP) — fonctions pures.
//
// Format groupé (data/events.json et sorties ajoutées par l'utilisateur) :
//   [{ artist, profiles, discography: [{ name, type, label, release_date: { day, month, year } }] }]
// Format « à plat » utilisé par l'affichage :
//   { artist, release, type, label, rank, day, month, year, profiles }
// ---------------------------------------------------------------------------

import { addDays, daysBetween, startOfDay } from "../../core/dates.js";
import { ordinal, plural } from "../../core/text.js";

const isEP = (release) => release.type === "EP";

const sameRelease = (a, b) =>
	a.name === b.name &&
	a.type === b.type &&
	(a.label || null) === (b.label || null) &&
	a.release_date.year === b.release_date.year &&
	a.release_date.month === b.release_date.month &&
	a.release_date.day === b.release_date.day;

/** Fusionne deux listes groupées sans doublon ni mutation des entrées. */
export function mergeGroups(base, custom) {
	const byArtist = new Map();
	for (const group of [...base, ...custom]) {
		const existing = byArtist.get(group.artist);
		if (!existing) {
			byArtist.set(group.artist, {
				artist: group.artist,
				profiles: [...(group.profiles ?? [])],
				discography: [...(group.discography ?? [])],
			});
			continue;
		}
		for (const release of group.discography ?? []) {
			if (!existing.discography.some((r) => sameRelease(r, release)))
				existing.discography.push(release);
		}
	}
	return [...byArtist.values()];
}

const releaseTime = ({ release_date: d }) => new Date(d.year, d.month - 1, d.day).getTime();

/**
 * Transforme un artiste groupé en événements à plat. Le rang (« 3ème album »)
 * est calculé chronologiquement, séparément pour les albums et les EP ; les
 * rééditions (avec label : « Taylor's Version », « Deluxe »…) ne comptent pas.
 */
export function flattenGroup({ artist, profiles = [], discography = [] }) {
	const counters = { album: 0, EP: 0 };
	return [...discography]
		.sort((a, b) => releaseTime(a) - releaseTime(b))
		.map((release) => {
			const kind = isEP(release) ? "EP" : "album";
			const rank = release.label ? null : ++counters[kind];
			const { day, month, year } = release.release_date;
			return {
				artist,
				release: release.name,
				type: kind,
				label: release.label || null,
				rank,
				day,
				month,
				year,
				profiles,
			};
		});
}

export const flattenGroups = (groups) => groups.flatMap(flattenGroup);

// --- Textes -----------------------------------------------------------------

/** « son troisième album Speak Now » / « la Taylor's Version de Fearless ». */
export function describeRelease(event) {
	if (event.label) return `la ${event.label} de ${event.release}`;
	return `son ${ordinal(event.rank)} ${event.type} ${event.release}`;
}

export function anniversaryText(event, today = new Date()) {
	const years = today.getFullYear() - event.year;
	return `${event.artist} sortait ${describeRelease(event)} il y a ${plural(years, "an")} 🎵`;
}

/** Anniversaire à venir : « Taylor Swift · 15 ans de Speak Now 🎂 ». */
export function anniversarySoonText(event, date) {
	const years = date.getFullYear() - event.year;
	const what = event.label ? `la ${event.label} de ${event.release}` : event.release;
	return `${event.artist} · ${plural(years, "an")} de ${what} 🎂`;
}

export function releaseTodayText(event) {
	return `${event.artist} sort ${describeRelease(event)} aujourd'hui ! 🎉`;
}

export function upcomingReleaseText(event) {
	return `${event.artist} sort ${describeRelease(event)} 🎵`;
}

// --- Requêtes ---------------------------------------------------------------

const eventDate = (e) => new Date(e.year, e.month - 1, e.day);

/** Le 29 février est fêté le 28 les années non bissextiles. */
function isAnniversaryOn(event, date) {
	if (event.month !== date.getMonth() + 1) return false;
	if (event.day === date.getDate()) return true;
	const isLeap = new Date(date.getFullYear(), 1, 29).getMonth() === 1;
	return event.month === 2 && event.day === 29 && !isLeap && date.getDate() === 28;
}

/** Sorties prévues exactement à cette date. */
export function releasesOn(events, date) {
	return events.filter((e) => daysBetween(eventDate(e), date) === 0);
}

/** Anniversaires de sorties des années passées, les plus récentes d'abord. */
export function anniversariesOn(events, date) {
	return events
		.filter((e) => e.year < date.getFullYear() && isAnniversaryOn(e, date))
		.sort((a, b) => b.year - a.year);
}

/** Anniversaires des `days` prochains jours (aujourd'hui exclu). */
export function upcomingAnniversaries(events, today = new Date(), days = 3) {
	const result = [];
	for (let offset = 1; offset <= days; offset++) {
		const date = addDays(startOfDay(today), offset);
		for (const event of anniversariesOn(events, date))
			result.push({ event, date, daysLeft: offset });
	}
	return result;
}

/** Prochaine sortie strictement future (celle du jour est gérée par le bandeau). */
export function nextRelease(events, today = new Date()) {
	const upcoming = events
		.map((event) => ({ event, daysLeft: daysBetween(today, eventDate(event)) }))
		.filter(({ daysLeft }) => daysLeft > 0)
		.sort((a, b) => a.daysLeft - b.daysLeft);
	return upcoming[0] ?? null;
}

export function filterForProfile(events, user, ownOnly) {
	return ownOnly ? events.filter((e) => e.profiles.includes(user)) : events;
}

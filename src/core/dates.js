// ---------------------------------------------------------------------------
// Dates — toujours en heure locale (toISOString renverrait la date UTC).
// ---------------------------------------------------------------------------

const DAY_MS = 86_400_000;

export const FRENCH_MONTHS = [
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre",
];

/** Date locale au format AAAA-MM-JJ. */
export function localDateKey(date = new Date()) {
	const mm = String(date.getMonth() + 1).padStart(2, "0");
	const dd = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${mm}-${dd}`;
}

export function startOfDay(date = new Date()) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date, days) {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/** Nombre de jours calendaires entre deux dates (insensible aux changements d'heure). */
export function daysBetween(from, to) {
	return Math.round((startOfDay(to) - startOfDay(from)) / DAY_MS);
}

/** Vrai si (jour, mois, année) désigne une date qui existe (pas de 31/02). */
export function isValidDate(day, month, year) {
	const date = new Date(year, month - 1, day);
	return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// ---------------------------------------------------------------------------
// Texte
// ---------------------------------------------------------------------------

/** « Taylor Swift » → « TS », « Disquaires » → « DI ». */
export function initialsOf(name) {
	const words = name.trim().split(/\s+/).filter(Boolean);
	const letters = words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? "").slice(0, 2);
	return letters.toUpperCase();
}

const ORDINALS = [
	"premier",
	"deuxième",
	"troisième",
	"quatrième",
	"cinquième",
	"sixième",
	"septième",
	"huitième",
	"neuvième",
	"dixième",
];

/** 1 → « premier », 3 → « troisième », 12 → « 12ème ». */
export function ordinal(n) {
	if (n >= 1 && n <= ORDINALS.length) return ORDINALS[n - 1];
	return `${n}ème`;
}

/** plural(1, "an") → « 1 an », plural(3, "an") → « 3 ans ». */
export function plural(n, word) {
	return `${n} ${word}${Math.abs(n) > 1 ? "s" : ""}`;
}

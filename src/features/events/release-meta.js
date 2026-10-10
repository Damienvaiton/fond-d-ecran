// ---------------------------------------------------------------------------
// Pochette et infos d'une sortie via l'API de recherche iTunes, avec un cache
// local valable pour la journée.
// ---------------------------------------------------------------------------

import { localDateKey } from "../../core/dates.js";
import { KEYS, readJSON, writeJSON } from "../../core/storage.js";

function readCache() {
	const today = localDateKey();
	const cache = readJSON(KEYS.releaseCache, null);
	return cache?.date === today ? cache : { date: today, entries: {} };
}

export async function fetchReleaseMeta(artist, album) {
	const query = `${album} ${artist}`.trim();
	const cache = readCache();
	if (query in cache.entries) return cache.entries[query];

	let meta = null;
	try {
		const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=album&limit=5`;
		const res = await fetch(url);
		if (!res.ok) return null; // pas de mise en cache : on réessaiera
		const { results = [] } = await res.json();
		const wanted = artist.toLowerCase();
		const match =
			results.find((r) => {
				const name = (r.artistName ?? "").toLowerCase();
				return name.includes(wanted) || wanted.includes(name);
			}) ?? results[0];
		if (match?.artworkUrl100) {
			meta = {
				artwork: match.artworkUrl100.replace("100x100bb", "300x300bb"),
				artist: match.artistName,
				album: match.collectionName,
				spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(query)}/albums`,
			};
		}
	} catch {
		return null; // hors ligne : pas de mise en cache non plus
	}

	cache.entries[query] = meta; // un « pas de résultat » est aussi mémorisé
	writeJSON(KEYS.releaseCache, cache);
	return meta;
}

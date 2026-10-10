// ---------------------------------------------------------------------------
// Manifeste des images (data/assets.json, généré par `npm run assets`).
// ---------------------------------------------------------------------------

const MANIFEST_URL = "data/assets.json";

let manifest = { backgrounds: [], artistPhotos: [] };

export async function loadAssets() {
	try {
		const res = await fetch(MANIFEST_URL);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		manifest = { ...manifest, ...(await res.json()) };
	} catch (err) {
		console.error(`[assets] impossible de charger ${MANIFEST_URL}`, err);
	}
}

/** Noms de fichiers dans assets/backgrounds. */
export const getBackgrounds = () => manifest.backgrounds;

/** « Taylor Swift » → « taylor_swift » */
function artistSlug(name) {
	return name
		.normalize("NFD")
		.replace(/\p{M}/gu, "") // retire les accents
		.toLowerCase()
		.replace(/\s+/g, "_")
		.replace(/[^a-z0-9_]/g, "");
}

/** Chemin de la photo d'un artiste, ou null s'il n'en a pas. */
export function artistPhoto(name) {
	const slug = artistSlug(name);
	const file = manifest.artistPhotos.find((f) => f.replace(/\.[^.]+$/, "") === slug);
	return file ? `assets/artists/${file}` : null;
}

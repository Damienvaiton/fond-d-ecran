// ---------------------------------------------------------------------------
// URLs
// ---------------------------------------------------------------------------

/** Hostname d'une URL, ou "" si elle est invalide. */
function safeHostname(url) {
	try {
		return new URL(url).hostname;
	} catch {
		return "";
	}
}

/** Ajoute https:// si l'utilisateur a saisi « youtube.com ». */
export function normalizeUrl(input) {
	const url = input.trim();
	if (!url) return "";
	return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/**
 * Vrai si la chaîne est une URL http(s) exploitable. Vérifications explicites :
 * le parseur de Chrome accepte par exemple des espaces dans le nom d'hôte.
 */
export function isHttpUrl(input) {
	if (/\s/.test(input)) return false;
	try {
		const { protocol, hostname } = new URL(input);
		const validHost = hostname === "localhost" || /^[^.]+(\.[^.]+)+$/.test(hostname);
		return (protocol === "http:" || protocol === "https:") && validHost;
	} catch {
		return false;
	}
}

export function faviconUrl(url) {
	const hostname = safeHostname(url);
	return hostname
		? `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(hostname)}`
		: "";
}

/** Propose un nom à partir d'une URL : « https://www.youtube.com » → « Youtube ». */
export function nameFromUrl(input) {
	const hostname = safeHostname(normalizeUrl(input)).replace(/^www\./, "");
	const domain = hostname.split(".")[0] || "";
	return domain.charAt(0).toUpperCase() + domain.slice(1);
}

/**
 * Devine le drapeau d'un store à partir de son hostname, segment par segment
 * (« taylorswift-store.fr », « storefr.… », « shopuk.… »).
 */
export function inferFlag(url) {
	const parts = safeHostname(url).toLowerCase().split(/[.-]/);
	const matches = (code) =>
		parts.includes(code) || parts.includes(`store${code}`) || parts.includes(`shop${code}`);
	return ["fr", "uk", "de", "eu", "dk", "us"].find(matches) ?? "web";
}

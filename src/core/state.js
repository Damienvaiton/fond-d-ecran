// ---------------------------------------------------------------------------
// État partagé : profil courant + bus d'événements minimal entre modules.
//
// Événements émis :
//   "profile"   — un profil vient d'être chargé (payload : nom du profil)
//   "shortcuts" — les raccourcis ont changé (payload : { folder } pour rouvrir un dossier)
//   "artists"   — le catalogue d'artistes/stores a changé
//   "events"    — les événements (sorties) ont changé
//   "settings"  — un réglage du profil a changé
//   "day"       — on vient de passer minuit
// ---------------------------------------------------------------------------

let currentUser = null;
const listeners = new Map();

export const getUser = () => currentUser;

export function setUser(name) {
	currentUser = name;
	emit("profile", name);
}

export function on(event, handler) {
	if (!listeners.has(event)) listeners.set(event, new Set());
	listeners.get(event).add(handler);
	return () => listeners.get(event).delete(handler);
}

export function emit(event, payload) {
	for (const handler of listeners.get(event) ?? []) {
		try {
			handler(payload);
		} catch (err) {
			console.error(`[state] erreur dans un écouteur "${event}"`, err);
		}
	}
}

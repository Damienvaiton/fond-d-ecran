// ---------------------------------------------------------------------------
// Message de bienvenue
// ---------------------------------------------------------------------------

import { $ } from "../core/dom.js";
import { displayName } from "../core/settings.js";
import { getUser, on } from "../core/state.js";

function greeting(hour) {
	if (hour >= 5 && hour < 12) return ["Bonjour", "☀️"];
	if (hour >= 12 && hour < 18) return ["Bon après-midi", "🌤️"];
	if (hour >= 18 && hour < 22) return ["Bonsoir", "🌙"];
	return ["Bonne nuit", "🌙"];
}

export function initWelcome() {
	const render = () => {
		const user = getUser();
		if (!user) return;
		const [words, emoji] = greeting(new Date().getHours());
		$("#welcome-msg").textContent = `${words}, ${displayName(user)} ${emoji}`;
	};
	on("profile", render);
	on("settings", render);
	setInterval(render, 60_000); // le message change au fil de la journée
}

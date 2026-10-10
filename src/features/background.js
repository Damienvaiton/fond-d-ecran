// ---------------------------------------------------------------------------
// Fond d'écran aléatoire parmi ceux du manifeste (data/assets.json), moins les
// fonds masqués pour le profil (src/config.js).
// ---------------------------------------------------------------------------

import { PROFILES } from "../config.js";
import { getBackgrounds } from "../core/assets.js";
import { $ } from "../core/dom.js";
import { on } from "../core/state.js";

const DIR = "assets/backgrounds";

export function initBackground() {
	on("profile", showRandomBackground);
}

function showRandomBackground(user) {
	const hidden = new Set(PROFILES[user]?.hiddenBackgrounds ?? []);
	tryNext(getBackgrounds().filter((f) => !hidden.has(f)));
}

/** Tire un fond au hasard ; s'il ne se charge pas, en essaie un autre. */
function tryNext(candidates) {
	if (!candidates.length) return;
	const index = Math.floor(Math.random() * candidates.length);
	const file = candidates[index];
	const img = new Image();
	img.onload = () => {
		const bg = $("#bg");
		bg.style.backgroundImage = `url("${img.src}")`;
		bg.classList.add("visible");
	};
	img.onerror = () => {
		console.warn(`[background] fond introuvable : ${file}`);
		tryNext(candidates.filter((_, i) => i !== index));
	};
	img.src = `${DIR}/${encodeURIComponent(file)}`;
}

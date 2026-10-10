// ---------------------------------------------------------------------------
// Horloge analogique + date en affichage LED.
// ---------------------------------------------------------------------------

import { $ } from "../core/dom.js";
import { getSettings } from "../core/settings.js";
import { getUser, on } from "../core/state.js";

export function initClock() {
	tick();
	// Aligné sur le début de chaque seconde pour éviter les sauts de l'aiguille
	setTimeout(
		() => {
			tick();
			setInterval(tick, 1000);
		},
		1000 - (Date.now() % 1000),
	);

	const applyVisibility = () => {
		const user = getUser();
		if (user) $("#clock-wrapper").classList.toggle("hidden", !getSettings(user).clockVisible);
	};
	on("profile", applyVisibility);
	on("settings", applyVisibility);
}

function tick() {
	const now = new Date();
	const minutes = now.getMinutes() + now.getSeconds() / 60;
	const hours = (now.getHours() % 12) + minutes / 60;
	$("#minute-hand").setAttribute("transform", `rotate(${minutes * 6}, 100, 100)`);
	$("#hour-hand").setAttribute("transform", `rotate(${hours * 30}, 100, 100)`);

	const day = String(now.getDate()).padStart(2, "0");
	const month = String(now.getMonth() + 1).padStart(2, "0");
	$("#date-left").textContent = `${day}/${month}`;
	$("#date-right").textContent = now.getFullYear();
}

// ---------------------------------------------------------------------------
// Point d'entrée : migrations, initialisation des modules, profil.
// Chaque module s'abonne aux événements de src/core/state.js ("profile",
// "artists", "events"…) et se met à jour tout seul.
// ---------------------------------------------------------------------------

import { loadAssets } from "./core/assets.js";
import { runMigrations } from "./core/migrations.js";
import { emit } from "./core/state.js";
import { initArtistSidebar } from "./features/artists/sidebar.js";
import { initBackground } from "./features/background.js";
import { initClock } from "./features/clock.js";
import { initConfigDialog } from "./features/config-dialog.js";
import { initAddEventDialog } from "./features/events/add-event-dialog.js";
import { initBanner } from "./features/events/banner.js";
import { initCountdown } from "./features/events/countdown.js";
import { loadEvents } from "./features/events/repository.js";
import { initLens } from "./features/lens.js";
import { initProfileSelector, restoreProfile } from "./features/profile.js";
import { initSearch } from "./features/search.js";
import { initShortcutDialogs } from "./features/shortcuts/dialogs.js";
import { initShortcutsView } from "./features/shortcuts/view.js";
import { initWelcome } from "./features/welcome.js";

/** Émet "day" à minuit pour rafraîchir bandeau et compte à rebours. */
function scheduleDayChange() {
	const now = new Date();
	const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
	setTimeout(
		() => {
			emit("day");
			scheduleDayChange();
		},
		midnight - now + 1000,
	);
}

async function main() {
	runMigrations();

	initBackground();
	initClock();
	initWelcome();
	initSearch();
	initLens();
	initShortcutsView();
	initShortcutDialogs();
	initArtistSidebar();
	initBanner();
	initCountdown();
	initConfigDialog();
	initAddEventDialog();
	initProfileSelector();

	await Promise.all([loadAssets(), loadEvents()]);
	restoreProfile();
	scheduleDayChange();
}

main();

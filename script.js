// ---------------------------------------------------------------------------
// BACKGROUNDS & PROFILS
// ---------------------------------------------------------------------------

const sharedBackgrounds = [
	"1.webp",
	"2.webp",
	"3.webp",
	"4.webp",
	"5.webp",
	"6.webp",
	"7.webp",
	"8.webp",
	"9.webp",
	"10.webp",
	"11.webp",
	"12.webp",
	"13.webp",
	"14.webp",
	"15.webp",
	"16.webp",
	"17.webp",
	"18.webp",
	"19.webp",
	"20.webp",
	"21.webp",
	"22.webp",
	"23.webp",
	"24.webp",
	"25.webp",
	"26.webp",
	"27.webp",
	"28.webp",
	"29.webp",
	"30.webp",
	"31.webp",
	"32.webp",
	"33.webp",
	"34.webp",
	"35.webp",
	"36.webp",
	"37.webp",
	"38.webp",
	"39.webp",
	"40.webp",
	"41.webp",
	"42.webp",
	"43.webp",
	"44.webp",
	"45.webp",
	"46.webp",
	"47.webp",
	"48.webp",
	"49.webp",
	"51.webp",
	"52.webp",
	"55.webp",
	"56.webp",
	"57.webp",
	"59.webp",
	"60.webp",
	"61.webp",
	"62.webp",
	"63.webp",
	"64.webp",
	"65.webp",
	"66.webp",
	"67.webp",
	"68.webp",
	"69.webp",
	"70.webp",
	"71.webp",
	"72.webp",
	"73.webp",
	"74.webp",
	"75.webp",
	"76.webp",
	"1.gif",
	"2.gif",
	"3.gif",
	"4.gif",
];

const profiles = {
	Carotte: {
		backgrounds: sharedBackgrounds,
	},
	Alex: {
		backgrounds: [
			...sharedBackgrounds.filter((f) => !["51.webp"].includes(f)),
			"50.webp",
			"53.webp",
			"54.webp",
			"58.webp",
		].sort((a, b) => {
			const num = (s) => parseInt(s) || 999;
			const ext = (s) => s.split(".").pop();
			if (ext(a) !== ext(b)) return ext(a) === "webp" ? -1 : 1;
			return num(a) - num(b);
		}),
	},
};

// ---------------------------------------------------------------------------
// ARTISTES & STORES
// ---------------------------------------------------------------------------

const artists = [
	{
		name: "Taylor Swift",
		initials: "TS",
		category: "store",
		profiles: ["Carotte", "Alex"],
		stores: [
			{
				id: "ts_web",
				label: "Site officiel",
				flag: "web",
				url: "https://taylorswift.com",
			},
			{
				id: "ts_fr",
				label: "Store France",
				flag: "fr",
				url: "https://taylorswift-store.fr",
			},
			{
				id: "ts_eu",
				label: "Store Europe",
				flag: "eu",
				url: "https://store.taylorswifteu.com",
			},
			{
				id: "ts_us",
				label: "Store US",
				flag: "us",
				url: "https://store.taylorswift.com",
			},
			{
				id: "ts_uk",
				label: "Store UK",
				flag: "uk",
				url: "https://taylorswift-store.co.uk",
			},
		],
	},
	{
		name: "Gracie Abrams",
		initials: "GA",
		category: "store",
		profiles: ["Carotte", "Alex"],
		stores: [
			{
				id: "ga_fr",
				label: "Store France",
				flag: "fr",
				url: "https://gracieabrams-store.fr",
			},
			{
				id: "ga_eu",
				label: "Store Europe",
				flag: "eu",
				url: "https://shop.gracieabrams.eu",
			},
			{
				id: "ga_de",
				label: "Store Allemagne",
				flag: "de",
				url: "https://gracieabrams.universal-music.de/en",
			},
			{
				id: "ga_uk",
				label: "Store UK",
				flag: "uk",
				url: "https://shopuk.gracieabrams.com",
			},
			{
				id: "ga_us",
				label: "Store US",
				flag: "us",
				url: "https://shop.gracieabrams.com",
			},
		],
	},
	{
		name: "Tate McRae",
		initials: "TM",
		category: "store",
		profiles: ["Carotte", "Alex"],
		stores: [
			{
				id: "tm_eu",
				label: "Store Europe",
				flag: "eu",
				url: "https://tatemcraeeu.store/",
			},
			{
				id: "tm_uk",
				label: "Store UK",
				flag: "uk",
				url: "https://tatemcraeuk.store/",
			},
			{
				id: "tm_us",
				label: "Store US",
				flag: "us",
				url: "https://tatemcrae.store/",
			},
		],
	},
	{
		name: "Sabrina Carpenter",
		initials: "SC",
		category: "store",
		profiles: ["Carotte", "Alex"],
		stores: [
			{
				id: "sc_fr",
				label: "Store France",
				flag: "fr",
				url: "https://storefr.sabrinacarpenter.com/",
			},
			{
				id: "sc_de",
				label: "Store Allemagne",
				flag: "de",
				url: "https://storede.sabrinacarpenter.com/en",
			},
			{
				id: "sc_uk",
				label: "Store UK",
				flag: "uk",
				url: "https://shopuk.sabrinacarpenter.com/",
			},
			{
				id: "sc_us",
				label: "Store US",
				flag: "us",
				url: "https://store.sabrinacarpenter.com/",
			},
		],
	},
	{
		name: "Disquaires",
		initials: "D",
		category: "store",
		profiles: ["Carotte", "Alex"],
		stores: [
			{
				id: "iMusic_fr",
				label: "iMusic France",
				flag: "fr",
				url: "https://www.imusic.fr",
			},
		],
	},
	{
		name: "Autres",
		initials: "A",
		category: "autres",
		profiles: ["Carotte", "Alex"],
		stores: [
			{
				id: "bw",
				label: "Bad World",
				flag: "uk",
				url: "https://bad-world.co.uk/",
			},
			{
				id: "br",
				label: "Blood Records",
				flag: "uk",
				url: "https://blood-records.co.uk/",
			},
		],
	},
];

// ---------------------------------------------------------------------------
// STATE
// ---------------------------------------------------------------------------

let currentUser = null;
let eventsData = []; // chargé depuis events.json, immuable
let bannerInterval = null; // remplace window._bannerInterval

// ---------------------------------------------------------------------------
// LOCALSTORAGE HELPERS
// ---------------------------------------------------------------------------

function getShortcuts(user) {
	try {
		return JSON.parse(localStorage.getItem(`shortcuts_${user}`)) || [];
	} catch {
		return [];
	}
}
function saveShortcuts(user, shortcuts) {
	try {
		localStorage.setItem(`shortcuts_${user}`, JSON.stringify(shortcuts));
	} catch (e) {
		console.warn("[storage] saveShortcuts failed:", e);
	}
}

function getDisplayName(user) {
	return localStorage.getItem(`displayName_${user}`) || user;
}
function saveDisplayName(user, name) {
	try {
		localStorage.setItem(`displayName_${user}`, name);
	} catch (e) {
		console.warn("[storage] saveDisplayName failed:", e);
	}
}

function isClockVisible(user) {
	const v = localStorage.getItem(`clockVisible_${user}`);
	return v === null ? true : v === "true";
}
function saveClockVisible(user, val) {
	localStorage.setItem(`clockVisible_${user}`, String(val));
}

function isEventsFiltered(user) {
	return localStorage.getItem(`eventsFilter_${user}`) === "true";
}
function saveEventsFilter(user, val) {
	localStorage.setItem(`eventsFilter_${user}`, String(val));
}

function getDisabledStores(user) {
	try {
		return JSON.parse(localStorage.getItem(`disabledStores_${user}`)) || [];
	} catch {
		return [];
	}
}
function saveDisabledStores(user, list) {
	try {
		localStorage.setItem(`disabledStores_${user}`, JSON.stringify(list));
	} catch (e) {
		console.warn("[storage] saveDisabledStores failed:", e);
	}
}
function isStoreEnabled(user, storeId) {
	return !getDisabledStores(user).includes(storeId);
}
function toggleStore(user, storeId) {
	const disabled = getDisabledStores(user);
	const idx = disabled.indexOf(storeId);
	if (idx === -1) disabled.push(storeId);
	else disabled.splice(idx, 1);
	saveDisabledStores(user, disabled);
}

function getArtistOrder() {
	try {
		return JSON.parse(localStorage.getItem("artistOrder")) || null;
	} catch {
		return null;
	}
}
function saveArtistOrder(order) {
	localStorage.setItem("artistOrder", JSON.stringify(order));
}
function getOrderedArtists() {
	const order = getArtistOrder();
	if (!order) return [...artists];
	const map = Object.fromEntries(artists.map((a) => [a.name, a]));
	const ordered = order.map((name) => map[name]).filter(Boolean);
	artists.forEach((a) => {
		if (!order.includes(a.name)) ordered.push(a);
	});
	return ordered;
}

// ---------------------------------------------------------------------------
// EVENTS — chargement depuis events.json uniquement
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// EVENTS — génération du texte (format plat)
// ---------------------------------------------------------------------------

function generateEventText(artistName, release, rankAlbum, rankEP) {
	const ordinals = [
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
	function ordinal(n) {
		if (n <= 0) return String(n);
		if (n <= ordinals.length) return ordinals[n - 1];
		return `${n}ème`;
	}

	const isEP = release.type === "EP";
	const rank = isEP ? rankEP : rankAlbum;
	const typeLabel = isEP ? "EP" : "album";

	if (release.label) {
		// Avec label : "Taylor Swift sortait la Taylor's Version de Fearless il y a {n} ans 🎵"
		return `${artistName} sortait la ${release.label} de ${release.name} il y a {n} ans 🎵`;
	} else if (isEP) {
		// EP sans label : "Gracie Abrams sortait son 2ème EP This Is What It Feels Like il y a {n} ans 🎵"
		return `${artistName} sortait son ${ordinal(rank)} EP ${release.name} il y a {n} ans 🎵`;
	} else {
		// Album sans label : "Taylor Swift sortait son 3ème album Speak Now il y a {n} ans 🎵"
		return `${artistName} sortait son ${ordinal(rank)} album ${release.name} il y a {n} ans 🎵`;
	}
}

// ---------------------------------------------------------------------------
// EVENTS — transformation de la structure groupée vers le format plat
// ---------------------------------------------------------------------------

function transformArtistGroupToFlat(artistGroup) {
	const {
		artist: artistName,
		profiles: artistProfiles,
		discography,
	} = artistGroup;

	// Trier la discographie par date de sortie (chronologique) pour calculer les rangs
	const sorted = [...discography].sort((a, b) => {
		const da = new Date(
			a.release_date.year,
			a.release_date.month - 1,
			a.release_date.day,
		);
		const db = new Date(
			b.release_date.year,
			b.release_date.month - 1,
			b.release_date.day,
		);
		return da - db;
	});

	// Pré-calcul des rangs par type (albums sans label, EPs sans label) dans l'ordre chrono
	// Les sorties avec label (Taylor's Version, etc.) ne comptent pas dans le rang
	const flatEvents = [];

	let albumRank = 0;
	let epRank = 0;

	// On parcourt dans l'ordre chronologique pour attribuer les rangs
	const rankMap = new Map(); // clé = index dans sorted → { rankAlbum, rankEP }
	for (const release of sorted) {
		if (!release.label) {
			if (release.type === "EP") {
				epRank++;
				rankMap.set(release, { rankAlbum: albumRank, rankEP: epRank });
			} else {
				albumRank++;
				rankMap.set(release, { rankAlbum: albumRank, rankEP: epRank });
			}
		} else {
			// Avec label : rang basé sur ce qui existe avant cette date dans le type correspondant
			const releaseDate = new Date(
				release.release_date.year,
				release.release_date.month - 1,
				release.release_date.day,
			);
			const rankAlbumAtDate = sorted.filter(
				(r) =>
					!r.label &&
					r.type === "album" &&
					new Date(
						r.release_date.year,
						r.release_date.month - 1,
						r.release_date.day,
					) < releaseDate,
			).length;
			const rankEPAtDate = sorted.filter(
				(r) =>
					!r.label &&
					r.type === "EP" &&
					new Date(
						r.release_date.year,
						r.release_date.month - 1,
						r.release_date.day,
					) < releaseDate,
			).length;
			rankMap.set(release, {
				rankAlbum: rankAlbumAtDate,
				rankEP: rankEPAtDate,
			});
		}
	}

	for (const release of discography) {
		const { rankAlbum, rankEP } = rankMap.get(release) || {
			rankAlbum: 0,
			rankEP: 0,
		};
		const text = generateEventText(artistName, release, rankAlbum, rankEP);
		flatEvents.push({
			month: release.release_date.month,
			day: release.release_date.day,
			year: release.release_date.year,
			text,
			profiles: artistProfiles,
		});
	}

	return flatEvents;
}

async function loadAllEvents() {
	try {
		// 1. Fetch events.json (structure groupée)
		const res = await fetch("events.json");
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const grouped = await res.json();

		// 2. Fetch customEvents depuis localStorage (même structure groupée)
		let customGrouped = [];
		try {
			const raw = localStorage.getItem("customEvents");
			if (raw) customGrouped = JSON.parse(raw);
		} catch (e) {
			console.warn("[events] Impossible de lire customEvents :", e);
		}

		// 3. Fusionner les deux sources
		const allGrouped = [...grouped, ...customGrouped];

		// 4. Transformer chaque entrée groupée en événements plats
		eventsData = allGrouped.flatMap(transformArtistGroupToFlat);
	} catch (err) {
		console.error("[events] Impossible de charger events.json :", err);
		eventsData = [];
	}
}

// ---------------------------------------------------------------------------
// EVENTS — filtrage par profil
// ---------------------------------------------------------------------------

function isEventForProfile(event, user) {
	if (!isEventsFiltered(user)) return true;
	return event.profiles && event.profiles.includes(user);
}

// ---------------------------------------------------------------------------
// EVENTS — bandeau du jour
// ---------------------------------------------------------------------------

function formatEventText(event, currentYear) {
	const n = currentYear - event.year;
	if (n === 0) {
		// Supprime "{n} ans", "il y a {n} ans", etc. et ajoute "aujourd'hui"
		return (
			event.text
				.replace(/il y a\s*\{n\}\s*ans?/gi, "")
				.replace(/\{n\}\s*ans?/gi, "")
				.trim()
				.replace(/\s{2,}/g, " ") + " — c'est aujourd'hui ! 🎉"
		);
	}
	return event.text.replace(/\{n\}/g, String(n));
}

// ---------------------------------------------------------------------------
// CACHE RELEASE
// ---------------------------------------------------------------------------

function getReleaseCache(query) {
	const today = new Date().toISOString().slice(0, 10);
	const key = `releaseCache_${today}_${query}`;
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

function setReleaseCache(query, data) {
	const today = new Date().toISOString().slice(0, 10);
	const key = `releaseCache_${today}_${query}`;
	// Nettoyage des caches des jours précédents
	Object.keys(localStorage)
		.filter(
			(k) =>
				k.startsWith("releaseCache_") &&
				!k.startsWith(`releaseCache_${today}_`),
		)
		.forEach((k) => localStorage.removeItem(k));
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch {}
}

async function fetchSpotifyMeta(artistName, albumName) {
	const query = `${artistName} ${albumName}`.trim();
	const cached = getReleaseCache(query);
	if (cached) return cached;

	try {
		// On cherche album + artiste explicitement
		const searchTerm = encodeURIComponent(`${albumName} ${artistName}`);
		const url = `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&limit=5`;
		const res = await fetch(url);
		if (!res.ok) return null;
		const data = await res.json();
		if (!data.results?.length) return null;

		// On prend le premier résultat dont l'artiste correspond (insensible à la casse)
		const match =
			data.results.find(
				(r) =>
					r.artistName.toLowerCase().includes(artistName.toLowerCase()) ||
					artistName.toLowerCase().includes(r.artistName.toLowerCase()),
			) || data.results[0];

		const result = {
			artwork: match.artworkUrl100.replace("100x100bb", "300x300bb"),
			artistName: match.artistName,
			collectionName: match.collectionName,
			spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${albumName} ${artistName}`)}/albums`,
		};
		setReleaseCache(query, result);
		return result;
	} catch {
		return null;
	}
}

// Extrait le nom de l'album depuis le texte de l'event (entre guillemets ou après "album ")
function extractAlbumQuery(event) {
	// Cherche entre guillemets typographiques ou droits
	const quoted = event.text.match(/[«"""]([^»"""]+)[»"""]/);
	if (quoted) return quoted[1];
	// Cherche après "album " jusqu'à " il y a" ou emoji ou fin
	const afterAlbum = event.text.match(/album\s+(.+?)\s+(?:il y a|🎉|\s*$)/i);
	if (afterAlbum) return afterAlbum[1].trim();
	// Cherche après "EP "
	const afterEP = event.text.match(/EP\s+(.+?)\s+(?:il y a|🎉|\s*$)/i);
	if (afterEP) return afterEP[1].trim();
	return null;
}

// Construit la carte rich media pour une sortie aujourd'hui
async function buildReleaseCard(event) {
	const year = new Date().getFullYear();
	const text = formatEventText(event, year);

	const artistObj = artists.find((a) => event.text.includes(a.name));
	const artistName = artistObj?.name || "";
	const albumName = extractAlbumQuery(event);
	const meta =
		artistName || albumName
			? await fetchSpotifyMeta(artistName, albumName || "")
			: null;

	const el = document.createElement("div");
	el.className = "release-today-card";

	const spotifyIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.759-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.224-2.723a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 0 1 .257 1.072zm.105-2.835C14.692 9.15 9.375 8.977 6.297 9.92a.937.937 0 1 1-.543-1.794c3.532-1.072 9.404-.865 13.115 1.338a.937.937 0 0 1-.954 1.402z"/></svg>`;

	if (meta) {
		el.innerHTML = `
			<img class="release-today-art" src="${meta.artwork}" alt="">
			<div class="release-today-body">
				<span class="release-today-badge">Sortie aujourd'hui</span>
				<span class="release-today-album">${meta.collectionName}</span>
				<span class="release-today-artist">${meta.artistName}</span>
			</div>
			<a class="release-today-spotify" href="${meta.spotifyUrl}" target="_blank" title="Écouter sur Spotify">
				${spotifyIcon}
			</a>
		`;
	} else {
		el.innerHTML = `<span class="release-today-fallback">${text}</span>`;
	}
	return el;
}

async function checkTsEvents() {
	const now = new Date();
	const day = now.getDate();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();

	const banner = document.getElementById("ts-event-banner");
	if (!banner) return;

	// Sorties exactes aujourd'hui (year === cette année)
	const todayReleases = eventsData.filter(
		(e) =>
			e.month === month &&
			e.day === day &&
			e.year === year &&
			isEventForProfile(e, currentUser),
	);

	// Anniversaires aujourd'hui (year < cette année)
	const todayAnnis = eventsData
		.filter(
			(e) =>
				e.month === month &&
				e.day === day &&
				e.year < year &&
				isEventForProfile(e, currentUser),
		)
		.sort((a, b) => b.year - a.year);

	// Anniversaires dans les 3 prochains jours
	const upcomingItems = getUpcomingAnniversaries(3).map((ev) => ({
		isUpcoming: true,
		label: ev.daysLeft === 1 ? "Demain" : `Dans ${ev.daysLeft} jours`,
		text: ev.text,
	}));

	// Si sortie exacte aujourd'hui → carte rich media
	if (todayReleases.length > 0) {
		const cards = await Promise.all(todayReleases.map(buildReleaseCard));
		banner.innerHTML = "";
		banner.classList.add("has-release");

		if (cards.length === 1) {
			banner.appendChild(cards[0]);
		} else {
			let idx = 0;
			const wrapper = document.createElement("div");
			wrapper.className = "release-multi-wrapper";

			const prev = document.createElement("button");
			prev.className = "release-multi-nav";
			prev.textContent = "‹";
			const next = document.createElement("button");
			next.className = "release-multi-nav";
			next.textContent = "›";
			const slot = document.createElement("div");
			slot.appendChild(cards[0]);

			function show(i) {
				slot.innerHTML = "";
				slot.appendChild(cards[i]);
			}
			prev.addEventListener("click", (e) => {
				e.stopPropagation();
				idx = (idx - 1 + cards.length) % cards.length;
				show(idx);
			});
			next.addEventListener("click", (e) => {
				e.stopPropagation();
				idx = (idx + 1) % cards.length;
				show(idx);
			});
			wrapper.append(prev, slot, next);
			banner.appendChild(wrapper);
		}
		banner.classList.remove("hidden");
		return;
	}

	banner.classList.remove("has-release");

	// Pas de sortie exacte aujourd'hui → bandeau texte classique
	const slides = [
		...todayAnnis.map((e) => ({ text: formatEventText(e, year) })),
		...upcomingItems.map((u) => ({ text: `${u.label} — ${u.text}` })),
	];

	if (slides.length === 0) {
		banner.classList.add("hidden");
		return;
	}

	if (slides.length === 1) {
		banner.innerHTML = `<span>${slides[0].text}</span>`;
		banner.classList.remove("hidden");
		return;
	}

	// Carrousel texte multi-slides
	let currentIdx = 0;

	function renderBannerSlide() {
		const text = slides[currentIdx].text;
		const dots = slides
			.map(
				(_, i) =>
					`<span class="banner-dot${i === currentIdx ? " active" : ""}"></span>`,
			)
			.join("");
		banner.innerHTML = `
			<button class="banner-nav banner-prev" title="Précédent">‹</button>
			<div class="banner-slide-content">
				<span>${text}</span>
				<div class="banner-dots">${dots}</div>
			</div>
			<button class="banner-nav banner-next" title="Suivant">›</button>
		`;
		banner.querySelector(".banner-prev").addEventListener("click", (e) => {
			e.stopPropagation();
			currentIdx = (currentIdx - 1 + slides.length) % slides.length;
			renderBannerSlide();
		});
		banner.querySelector(".banner-next").addEventListener("click", (e) => {
			e.stopPropagation();
			currentIdx = (currentIdx + 1) % slides.length;
			renderBannerSlide();
		});
	}

	renderBannerSlide();
	banner.classList.remove("hidden");

	clearInterval(bannerInterval);
	bannerInterval = setInterval(() => {
		currentIdx = (currentIdx + 1) % slides.length;
		renderBannerSlide();
	}, 6000);
}

// ---------------------------------------------------------------------------
// EVENTS — countdown prochain événement
// ---------------------------------------------------------------------------

// Encadré countdown : uniquement les sorties exactes futures (year > aujourd'hui).
// Les anniversaires n'apparaissent jamais ici.
function getNextUpcomingEvent() {
	if (!currentUser || eventsData.length === 0) return null;

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	const futureExact = eventsData
		.filter((e) => {
			const d = new Date(e.year, e.month - 1, e.day);
			return d >= today && isEventForProfile(e, currentUser);
		})
		.sort(
			(a, b) =>
				new Date(a.year, a.month - 1, a.day) -
				new Date(b.year, b.month - 1, b.day),
		);

	if (futureExact.length === 0) return null;

	const e = futureExact[0];
	const evDate = new Date(e.year, e.month - 1, e.day);
	const daysLeft = Math.round((evDate - today) / 86_400_000);
	return {
		daysLeft,
		text: formatEventText(e, e.year),
		date: evDate,
	};
}

// Bandeau bas : anniversaires dans les 3 prochains jours (hors aujourd'hui, géré par checkTsEvents).
function getUpcomingAnniversaries(daysAhead = 3) {
	if (!currentUser || eventsData.length === 0) return [];

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const cy = today.getFullYear();
	const results = [];

	for (let d = 1; d <= daysAhead; d++) {
		const checkDate = new Date(today);
		checkDate.setDate(today.getDate() + d);
		const cm = checkDate.getMonth() + 1;
		const cd = checkDate.getDate();

		eventsData
			.filter(
				(e) =>
					e.month === cm &&
					e.day === cd &&
					e.year < cy &&
					isEventForProfile(e, currentUser),
			)
			.forEach((e) => {
				results.push({
					daysLeft: d,
					text: formatEventText(e, cy),
					date: checkDate,
				});
			});
	}
	return results;
}

function renderCountdown() {
	const existing = document.getElementById("event-countdown");
	if (existing) existing.remove();

	const ev = getNextUpcomingEvent();
	// Si l'événement est aujourd'hui, il est géré par le bandeau du bas — on n'affiche pas ici
	if (!ev || ev.daysLeft === 0) return;

	const label = ev.daysLeft === 1 ? "Demain" : `J-${ev.daysLeft}`;

	const el = document.createElement("div");
	el.id = "event-countdown";
	el.innerHTML = `
		<div class="cd-days">${label}</div>
		<div class="cd-sep"></div>
		<div class="cd-text">${ev.text.trim()}</div>
	`;

	const clockWrapper = document.getElementById("clock-wrapper");
	if (clockWrapper?.parentNode) clockWrapper.after(el);
}

// ---------------------------------------------------------------------------
// BIENVENUE
// ---------------------------------------------------------------------------

function updateWelcome(user) {
	const h = new Date().getHours();
	const [greeting, emoji] =
		h >= 5 && h < 12
			? ["Bonjour", "☀️"]
			: h >= 12 && h < 18
				? ["Bon après-midi", "🌤️"]
				: h >= 18 && h < 22
					? ["Bonsoir", "🌙"]
					: ["Bonne nuit", "🌙"];

	const el = document.getElementById("welcome-msg");
	if (el) el.textContent = `${greeting}, ${getDisplayName(user)} ${emoji}`;
}

// ---------------------------------------------------------------------------
// HORLOGE
// ---------------------------------------------------------------------------

function updateClock() {
	const now = new Date();
	const s = now.getSeconds(),
		m = now.getMinutes(),
		h = now.getHours();
	const mDeg = m * 6 + s * 0.1;
	const hDeg = (h % 12) * 30 + m * 0.5;

	document
		.getElementById("hour-g")
		?.setAttribute("transform", `rotate(${hDeg}, 100, 100)`);
	document
		.getElementById("minute-g")
		?.setAttribute("transform", `rotate(${mDeg}, 100, 100)`);

	const day = String(now.getDate()).padStart(2, "0");
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const left = document.getElementById("date-left");
	const right = document.getElementById("date-right");
	if (left) left.textContent = `${day}/${month}`;
	if (right) right.textContent = now.getFullYear();
}

function applyClockVisibility(user) {
	const wrapper = document.getElementById("clock-wrapper");
	if (wrapper) wrapper.style.display = isClockVisible(user) ? "" : "none";
}

// ---------------------------------------------------------------------------
// THEME COLOR
// ---------------------------------------------------------------------------

function extractDominantColor(imgSrc, callback) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const img = new Image();
	img.crossOrigin = "anonymous";
	img.onload = () => {
		canvas.width = canvas.height = 50;
		ctx.drawImage(img, 0, 0, 50, 50);
		const data = ctx.getImageData(0, 0, 50, 50).data;
		let r = 0,
			g = 0,
			b = 0,
			count = 0;
		for (let i = 0; i < data.length; i += 4) {
			const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
			if (brightness < 20 || brightness > 235) continue;
			r += data[i];
			g += data[i + 1];
			b += data[i + 2];
			count++;
		}
		if (count === 0) {
			callback("#1a1a2e");
			return;
		}
		callback(
			`rgb(${Math.round((r / count) * 0.6)},${Math.round((g / count) * 0.6)},${Math.round((b / count) * 0.6)})`,
		);
	};
	img.onerror = () => callback("#1a1a2e");
	img.src = imgSrc;
}

function setThemeColor(color) {
	let meta = document.querySelector('meta[name="theme-color"]');
	if (!meta) {
		meta = document.createElement("meta");
		meta.name = "theme-color";
		document.head.appendChild(meta);
	}
	meta.content = color;
}

// ---------------------------------------------------------------------------
// CHARGEMENT PROFIL
// ---------------------------------------------------------------------------

function loadProfile(name) {
	const data = profiles[name];
	if (!data) return;
	currentUser = name;

	const randomImg =
		data.backgrounds[Math.floor(Math.random() * data.backgrounds.length)];
	const bgEl = document.getElementById("bg");
	const img = new Image();
	img.src = `backgrounds/${randomImg}`;
	img.onload = () => {
		bgEl.style.backgroundImage = `url('${img.src}')`;
		bgEl.style.opacity = "1";
		extractDominantColor(img.src, setThemeColor);
	};

	updateWelcome(name);
	renderShortcuts(name);
	renderArtistStores();
	applyClockVisibility(name);
	clearInterval(bannerInterval);
	checkTsEvents(); // async, pas besoin d'await ici (fire-and-forget)
	renderCountdown();
	document.getElementById("search-input").focus();
}

// ---------------------------------------------------------------------------
// SÉLECTEUR DE PROFIL
// ---------------------------------------------------------------------------

function initUserSelector() {
	const btnContainer = document.querySelector(".user-buttons");
	if (!btnContainer) return;
	btnContainer.innerHTML = "";
	Object.keys(profiles).forEach((name) => {
		const btn = document.createElement("button");
		btn.textContent = getDisplayName(name);
		btn.addEventListener("click", () => {
			try {
				localStorage.setItem("currentUser", name);
			} catch (e) {
				console.warn(e);
			}
			document.getElementById("user-selector").classList.add("hidden");
			loadProfile(name);
		});
		btnContainer.appendChild(btn);
	});
}

// ---------------------------------------------------------------------------
// DRAG & DROP RACCOURCIS
// ---------------------------------------------------------------------------

let dragSrc = null;

function initDragDrop(container, user) {
	container.addEventListener("dragstart", (e) => {
		dragSrc = e.target.closest(".shortcut-item");
		if (!dragSrc) return;
		dragSrc.classList.add("dragging");
		e.dataTransfer.effectAllowed = "move";
	});
	container.addEventListener("dragend", () => {
		document
			.querySelectorAll(".shortcut-item")
			.forEach((el) => el.classList.remove("dragging", "drag-over"));
		dragSrc = null;
	});
	container.addEventListener("dragover", (e) => {
		e.preventDefault();
		const target = e.target.closest(".shortcut-item");
		if (!target || target === dragSrc) return;
		document
			.querySelectorAll(".shortcut-item")
			.forEach((el) => el.classList.remove("drag-over"));
		target.classList.add("drag-over");
		e.dataTransfer.dropEffect = "move";
	});
	container.addEventListener("drop", (e) => {
		e.preventDefault();
		const target = e.target.closest(".shortcut-item");
		if (!target || target === dragSrc) return;
		const items = [...container.querySelectorAll(".shortcut-item")];
		const fromIdx = items.indexOf(dragSrc);
		const toIdx = items.indexOf(target);
		const shortcuts = getShortcuts(user);
		const [moved] = shortcuts.splice(fromIdx, 1);
		shortcuts.splice(toIdx, 0, moved);
		saveShortcuts(user, shortcuts);
		renderShortcuts(user);
	});
}

// ---------------------------------------------------------------------------
// RACCOURCIS — rendu
// ---------------------------------------------------------------------------

function renderShortcuts(user) {
	const shortcuts = getShortcuts(user);
	const container = document.getElementById("shortcuts");
	container.innerHTML = "";

	shortcuts.forEach((s, i) => {
		let el;
		if (s.type === "folder") {
			el = createFolderItem(s, i, user);
		} else {
			const icon = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(s.url).hostname}`;
			el = document.createElement("a");
			el.className = "shortcut-item";
			el.href = s.url;
			el.draggable = true;
			el.dataset.index = i;
			el.innerHTML = `<div class="icon-wrapper"><img src="${icon}"></div><span>${s.name}</span>`;

			const removeBtn = document.createElement("button");
			removeBtn.className = "shortcut-remove";
			removeBtn.textContent = "✕";
			removeBtn.title = "Supprimer";
			removeBtn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				saveShortcuts(
					user,
					getShortcuts(user).filter((_, idx) => idx !== i),
				);
				renderShortcuts(user);
			});
			el.appendChild(removeBtn);

			el.addEventListener("contextmenu", (e) => {
				e.preventDefault();
				showContextMenu(e.clientX, e.clientY, i, user);
			});
		}
		el.style.animationDelay = `${i * 0.08}s`;
		container.appendChild(el);
	});

	initDragDrop(container, user);
}

// ---------------------------------------------------------------------------
// DOSSIERS
// ---------------------------------------------------------------------------

let openFolderIndex = null;

function createFolderItem(folder, index, user) {
	const item = document.createElement("div");
	item.className = "shortcut-item folder-item";
	item.draggable = true;
	item.dataset.index = index;
	item.innerHTML = `<div class="icon-wrapper folder-icon-wrapper"><span class="folder-emoji">📁</span></div><span>${folder.name}</span>`;

	const removeBtn = document.createElement("button");
	removeBtn.className = "shortcut-remove";
	removeBtn.textContent = "✕";
	removeBtn.title = "Supprimer";
	removeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		saveShortcuts(
			user,
			getShortcuts(user).filter((_, idx) => idx !== index),
		);
		renderShortcuts(user);
		closeFolderPopup();
	});
	item.appendChild(removeBtn);

	item.addEventListener("contextmenu", (e) => {
		e.preventDefault();
		showFolderContextMenu(e.clientX, e.clientY, index, user);
	});
	item.addEventListener("click", (e) => {
		if (e.target === removeBtn) return;
		e.preventDefault();
		toggleFolderPopup(folder, index, item, user);
	});
	return item;
}

function toggleFolderPopup(folder, index, anchorEl, user) {
	const popup = document.getElementById("folder-popup");
	if (openFolderIndex === index) {
		closeFolderPopup();
		return;
	}
	openFolderIndex = index;
	popup.innerHTML = "";

	const header = document.createElement("div");
	header.className = "folder-popup-header";
	header.innerHTML = `<span class="folder-popup-title">📁 ${folder.name}</span>`;

	const addBtn = document.createElement("button");
	addBtn.className = "folder-popup-add";
	addBtn.textContent = "+";
	addBtn.title = "Ajouter un lien";
	addBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		openAddLinkToFolder(index, user);
	});
	header.appendChild(addBtn);
	popup.appendChild(header);

	(folder.links || []).forEach((link, li) => {
		const icon = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(link.url).hostname}`;
		const row = document.createElement("a");
		row.className = "folder-popup-link";
		row.href = link.url;
		row.innerHTML = `<img src="${icon}" class="folder-link-icon"><span>${link.name}</span>`;

		const del = document.createElement("button");
		del.className = "folder-link-remove";
		del.textContent = "✕";
		del.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const shortcuts = getShortcuts(user);
			shortcuts[index].links.splice(li, 1);
			saveShortcuts(user, shortcuts);
			renderShortcuts(user);
			toggleFolderPopup(shortcuts[index], index, anchorEl, user);
		});
		row.appendChild(del);
		popup.appendChild(row);
	});

	if (!folder.links?.length) {
		const empty = document.createElement("div");
		empty.className = "folder-popup-empty";
		empty.textContent = "Dossier vide — cliquez + pour ajouter";
		popup.appendChild(empty);
	}

	popup.classList.remove("hidden");
	requestAnimationFrame(() => {
		const rect = anchorEl.getBoundingClientRect();
		popup.style.left = `${rect.left + rect.width / 2 - popup.offsetWidth / 2}px`;
		popup.style.top = `${rect.top - popup.offsetHeight - 10}px`;
	});
}

function closeFolderPopup() {
	document.getElementById("folder-popup").classList.add("hidden");
	openFolderIndex = null;
}

function openAddLinkToFolder(folderIndex, user) {
	closeFolderPopup();
	const modal = document.getElementById("shortcut-modal");
	const nameInput = document.getElementById("shortcut-name");
	const urlInput = document.getElementById("shortcut-url");
	nameInput.value = "";
	urlInput.value = "";
	modal.classList.remove("hidden");
	nameInput.focus();
	modal.dataset.folderIndex = folderIndex;
}

// ---------------------------------------------------------------------------
// MENU CONTEXTUEL RACCOURCI (clic droit)
// ---------------------------------------------------------------------------

let contextTarget = null;

function showContextMenu(x, y, index, user) {
	closeContextMenu();
	const menu = document.getElementById("shortcut-context-menu");
	contextTarget = { index, user };
	menu.classList.remove("hidden");
	menu.style.left = `${x}px`;
	menu.style.top = `${y}px`;
	requestAnimationFrame(() => {
		const rect = menu.getBoundingClientRect();
		if (rect.right > window.innerWidth) menu.style.left = `${x - rect.width}px`;
		if (rect.bottom > window.innerHeight)
			menu.style.top = `${y - rect.height}px`;
	});
}

function showFolderContextMenu(x, y, index, user) {
	closeContextMenu();
	const menu = document.getElementById("shortcut-context-menu");
	contextTarget = { index, user, isFolder: true };
	menu.classList.remove("hidden");
	menu.style.left = `${x}px`;
	menu.style.top = `${y}px`;
}

function closeContextMenu() {
	document.getElementById("shortcut-context-menu").classList.add("hidden");
	contextTarget = null;
}

function initContextMenu() {
	document.getElementById("ctx-edit").addEventListener("click", () => {
		if (!contextTarget) return;
		const { index, user, isFolder } = contextTarget;
		closeContextMenu();
		isFolder ? openEditFolder(index, user) : openEditShortcut(index, user);
	});

	document.getElementById("ctx-delete").addEventListener("click", () => {
		if (!contextTarget) return;
		const { index, user } = contextTarget;
		closeContextMenu();
		saveShortcuts(
			user,
			getShortcuts(user).filter((_, idx) => idx !== index),
		);
		renderShortcuts(user);
	});

	document.addEventListener("click", (e) => {
		if (!document.getElementById("shortcut-context-menu").contains(e.target))
			closeContextMenu();
		if (
			!document.getElementById("folder-popup").contains(e.target) &&
			!e.target.closest(".folder-item")
		)
			closeFolderPopup();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeContextMenu();
			closeFolderPopup();
		}
	});
}

// ---------------------------------------------------------------------------
// MODAL ÉDITION RACCOURCI
// ---------------------------------------------------------------------------

function initEditShortcutModal() {
	const modal = document.getElementById("edit-shortcut-modal");

	document
		.getElementById("edit-shortcut-cancel")
		.addEventListener("click", () => modal.classList.add("hidden"));
	document
		.getElementById("edit-shortcut-confirm")
		.addEventListener("click", saveEditedShortcut);

	["edit-shortcut-name", "edit-shortcut-url"].forEach((id) => {
		document.getElementById(id).addEventListener("keydown", (e) => {
			if (e.key === "Enter") saveEditedShortcut();
			if (e.key === "Escape") modal.classList.add("hidden");
		});
	});
	modal.addEventListener("click", (e) => {
		if (e.target === modal) modal.classList.add("hidden");
	});
}

function openEditShortcut(index, user) {
	const s = getShortcuts(user)[index];
	if (!s) return;
	const modal = document.getElementById("edit-shortcut-modal");
	const urlInput = document.getElementById("edit-shortcut-url");
	document.getElementById("edit-shortcut-name").value = s.name;
	urlInput.value = s.url;
	urlInput.disabled = false;
	urlInput.placeholder = "URL";
	modal.dataset.index = index;
	modal.dataset.user = user;
	delete modal.dataset.isFolder;
	modal.classList.remove("hidden");
	document.getElementById("edit-shortcut-name").focus();
}

function openEditFolder(index, user) {
	const s = getShortcuts(user)[index];
	if (!s) return;
	const modal = document.getElementById("edit-shortcut-modal");
	const urlInput = document.getElementById("edit-shortcut-url");
	document.getElementById("edit-shortcut-name").value = s.name;
	urlInput.value = "";
	urlInput.placeholder = "(dossier — pas d'URL)";
	urlInput.disabled = true;
	modal.dataset.index = index;
	modal.dataset.user = user;
	modal.dataset.isFolder = "true";
	modal.classList.remove("hidden");
	document.getElementById("edit-shortcut-name").focus();
}

function saveEditedShortcut() {
	const modal = document.getElementById("edit-shortcut-modal");
	const index = parseInt(modal.dataset.index);
	const user = modal.dataset.user;
	const isFolder = modal.dataset.isFolder === "true";
	const name = document.getElementById("edit-shortcut-name").value.trim();
	let url = document.getElementById("edit-shortcut-url").value.trim();

	if (!name) return;
	const shortcuts = getShortcuts(user);
	if (isFolder) {
		shortcuts[index].name = name;
	} else {
		if (!url) return;
		if (!/^https?:\/\//i.test(url)) url = "https://" + url;
		shortcuts[index].name = name;
		shortcuts[index].url = url;
	}
	saveShortcuts(user, shortcuts);
	renderShortcuts(user);

	// Reset
	modal.classList.add("hidden");
	delete modal.dataset.isFolder;
	const urlInput = document.getElementById("edit-shortcut-url");
	urlInput.disabled = false;
	urlInput.placeholder = "URL";
}

// ---------------------------------------------------------------------------
// MODAL AJOUT RACCOURCI
// ---------------------------------------------------------------------------

function initShortcutModal() {
	const modal = document.getElementById("shortcut-modal");
	const nameInput = document.getElementById("shortcut-name");
	const urlInput = document.getElementById("shortcut-url");

	document.getElementById("add-shortcut-btn").addEventListener("click", () => {
		nameInput.value = "";
		urlInput.value = "";
		delete modal.dataset.folderIndex;
		modal.classList.remove("hidden");
		nameInput.focus();
	});

	document.getElementById("shortcut-cancel").addEventListener("click", () => {
		delete modal.dataset.folderIndex;
		modal.classList.add("hidden");
	});

	// Auto-remplissage du nom depuis l'URL
	urlInput.addEventListener("blur", () => {
		if (!urlInput.value.trim() || nameInput.value.trim()) return;
		try {
			let url = urlInput.value.trim();
			if (!/^https?:\/\//i.test(url)) url = "https://" + url;
			const hostname = new URL(url).hostname.replace(/^www\./, "");
			const domain = hostname.split(".")[0];
			nameInput.value = domain.charAt(0).toUpperCase() + domain.slice(1);
		} catch {}
	});

	document.getElementById("shortcut-confirm").addEventListener("click", () => {
		const name = nameInput.value.trim();
		let url = urlInput.value.trim();
		if (!name || !url) return;
		if (!/^https?:\/\//i.test(url)) url = "https://" + url;

		if (modal.dataset.folderIndex !== undefined) {
			// Ajout dans un dossier
			const fi = parseInt(modal.dataset.folderIndex);
			const shortcuts = getShortcuts(currentUser);
			if (!shortcuts[fi].links) shortcuts[fi].links = [];
			shortcuts[fi].links.push({ name, url });
			saveShortcuts(currentUser, shortcuts);
			renderShortcuts(currentUser);
			const folderEl = document.querySelector(
				`.folder-item[data-index="${fi}"]`,
			);
			if (folderEl) toggleFolderPopup(shortcuts[fi], fi, folderEl, currentUser);
		} else {
			// Vérification doublon
			const shortcuts = getShortcuts(currentUser);
			if (shortcuts.some((s) => s.url === url)) {
				urlInput.style.borderColor = "rgba(255,80,80,0.6)";
				urlInput.title = "Ce raccourci existe déjà";
				setTimeout(() => {
					urlInput.style.borderColor = "";
					urlInput.title = "";
				}, 2000);
				return;
			}
			shortcuts.push({ name, url });
			saveShortcuts(currentUser, shortcuts);
			renderShortcuts(currentUser);
		}
		delete modal.dataset.folderIndex;
		modal.classList.add("hidden");
	});

	[nameInput, urlInput].forEach((input) => {
		input.addEventListener("keydown", (e) => {
			if (e.key === "Enter")
				document.getElementById("shortcut-confirm").click();
			if (e.key === "Escape") modal.classList.add("hidden");
		});
	});
	modal.addEventListener("click", (e) => {
		if (e.target === modal) modal.classList.add("hidden");
	});
}

// ---------------------------------------------------------------------------
// MODAL CRÉATION DOSSIER
// ---------------------------------------------------------------------------

function initFolderModal() {
	const modal = document.getElementById("folder-modal");

	document.getElementById("add-folder-btn").addEventListener("click", () => {
		document.getElementById("folder-name").value = "";
		modal.classList.remove("hidden");
		document.getElementById("folder-name").focus();
	});
	document
		.getElementById("folder-cancel")
		.addEventListener("click", () => modal.classList.add("hidden"));
	document
		.getElementById("folder-confirm")
		.addEventListener("click", createFolder);
	document.getElementById("folder-name").addEventListener("keydown", (e) => {
		if (e.key === "Enter") createFolder();
		if (e.key === "Escape") modal.classList.add("hidden");
	});
	modal.addEventListener("click", (e) => {
		if (e.target === modal) modal.classList.add("hidden");
	});
}

function createFolder() {
	const modal = document.getElementById("folder-modal");
	const name = document.getElementById("folder-name").value.trim();
	if (!name || !currentUser) return;
	const shortcuts = getShortcuts(currentUser);
	shortcuts.push({ type: "folder", name, links: [] });
	saveShortcuts(currentUser, shortcuts);
	renderShortcuts(currentUser);
	modal.classList.add("hidden");
}

// ---------------------------------------------------------------------------
// MODAL CONFIG
// ---------------------------------------------------------------------------

function initConfigModal() {
	const modal = document.getElementById("config-modal");

	document.getElementById("config-btn").addEventListener("click", () => {
		document.getElementById("config-profile-name").value =
			getDisplayName(currentUser);
		const clockToggle = document.getElementById("toggle-clock");
		const eventsToggle = document.getElementById("toggle-events-filter");
		if (clockToggle) clockToggle.checked = isClockVisible(currentUser);
		if (eventsToggle) eventsToggle.checked = isEventsFiltered(currentUser);

		// Reset sur onglet Profil
		modal
			.querySelectorAll(".config-tab")
			.forEach((t) => t.classList.remove("active"));
		modal
			.querySelectorAll(".config-tab-content")
			.forEach((t) => t.classList.add("hidden"));
		modal
			.querySelector(".config-tab[data-tab='profil']")
			.classList.add("active");
		document.getElementById("tab-profil").classList.remove("hidden");
		modal.classList.remove("hidden");
	});

	document.getElementById("toggle-clock").addEventListener("change", (e) => {
		saveClockVisible(currentUser, e.target.checked);
		applyClockVisibility(currentUser);
	});

	document
		.getElementById("toggle-events-filter")
		.addEventListener("change", (e) => {
			saveEventsFilter(currentUser, e.target.checked);
			clearInterval(bannerInterval);
			checkTsEvents();
		});

	modal.querySelector(".config-tabs").addEventListener("click", (e) => {
		const tab = e.target.closest(".config-tab");
		if (!tab) return;
		const tabName = tab.dataset.tab;
		modal
			.querySelectorAll(".config-tab")
			.forEach((t) => t.classList.remove("active"));
		["tab-profil", "tab-artistes"].forEach((id) =>
			document.getElementById(id)?.classList.add("hidden"),
		);
		tab.classList.add("active");
		document.getElementById("tab-" + tabName)?.classList.remove("hidden");
		if (tabName === "artistes") renderArtistsConfig();
	});

	document
		.getElementById("config-close")
		.addEventListener("click", () => modal.classList.add("hidden"));

	document.getElementById("config-save-name").addEventListener("click", () => {
		const newName = document.getElementById("config-profile-name").value.trim();
		if (!newName) return;
		saveDisplayName(currentUser, newName);
		updateWelcome(currentUser);
		initUserSelector();
		const btn = document.getElementById("config-save-name");
		btn.textContent = "✓ Sauvegardé";
		setTimeout(() => (btn.textContent = "Sauvegarder"), 1500);
	});

	document
		.getElementById("config-profile-name")
		.addEventListener("keydown", (e) => {
			if (e.key === "Enter")
				document.getElementById("config-save-name").click();
			if (e.key === "Escape") modal.classList.add("hidden");
		});
	modal.addEventListener("click", (e) => {
		if (e.target === modal) modal.classList.add("hidden");
	});

	document
		.getElementById("export-events-btn")
		.addEventListener("click", exportEventsJson);
}

// ---------------------------------------------------------------------------
// EVENTS — export
// ---------------------------------------------------------------------------

async function exportEventsJson() {
	// 1. Load base events.json
	let base = [];
	try {
		const res = await fetch("events.json");
		if (res.ok) base = await res.json();
	} catch (e) {
		console.warn("[export] Could not fetch events.json:", e);
	}

	// 2. Load customEvents from localStorage
	let custom = [];
	try {
		const raw = localStorage.getItem("customEvents");
		if (raw) custom = JSON.parse(raw);
	} catch (e) {
		console.warn("[export] Could not parse customEvents:", e);
	}

	// 3. Merge: deep-copy base, then fold in custom releases
	const merged = base.map((a) => ({
		...a,
		discography: [...a.discography],
	}));

	for (const customArtist of custom) {
		const existing = merged.find((a) => a.artist === customArtist.artist);
		if (existing) {
			// Push releases not already present (match by name + type + label + date)
			for (const rel of customArtist.discography) {
				const alreadyThere = existing.discography.some(
					(r) =>
						r.name === rel.name &&
						r.type === rel.type &&
						r.label === rel.label &&
						r.release_date.year === rel.release_date.year &&
						r.release_date.month === rel.release_date.month &&
						r.release_date.day === rel.release_date.day,
				);
				if (!alreadyThere) existing.discography.push(rel);
			}
		} else {
			merged.push({
				...customArtist,
				discography: [...customArtist.discography],
			});
		}
	}

	// 4. Trigger download
	const blob = new Blob([JSON.stringify(merged, null, 4)], {
		type: "application/json",
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "events.json";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// ARTISTES — sidebar
// ---------------------------------------------------------------------------

function initArtistStores() {
	renderArtistStores();
	document.addEventListener("click", () => {
		document
			.querySelectorAll(".artist-pill")
			.forEach((p) => p.classList.remove("open"));
	});
}

function renderArtistStores() {
	const container = document.getElementById("artist-stores");
	if (!container) return;
	container.innerHTML = "";

	const ordered = getOrderedArtists();
	const categories = {};
	const catOrder = [];
	ordered.forEach((artist) => {
		const cat = artist.category || "store";
		if (!categories[cat]) {
			categories[cat] = [];
			catOrder.push(cat);
		}
		categories[cat].push(artist);
	});

	catOrder.forEach((cat) => {
		categories[cat].forEach((artist) => {
			const activeStores = artist.stores.filter((s) =>
				isStoreEnabled(currentUser, s.id),
			);
			if (activeStores.length === 0) return;

			const pill = document.createElement("div");
			pill.className = "artist-pill";

			const avatar = document.createElement("div");
			avatar.className = "artist-avatar";
			avatar.textContent = artist.initials;
			applyArtistPhoto(avatar, artist);

			const labelEl = document.createElement("div");
			labelEl.className = "artist-label";
			labelEl.textContent = artist.name;

			const dropdown = document.createElement("div");
			dropdown.className = "store-dropdown";

			const header = document.createElement("div");
			header.className = "dropdown-header";
			header.innerHTML = `<span class="dropdown-title">${artist.name}</span>`;

			const openAllBtn = document.createElement("button");
			openAllBtn.className = "open-all-btn";
			openAllBtn.textContent = "Tout ouvrir";
			openAllBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				activeStores.forEach((s) => window.open(s.url, "_blank"));
			});
			header.appendChild(openAllBtn);
			dropdown.appendChild(header);

			activeStores.forEach((store) => {
				const link = document.createElement("a");
				link.className = "store-link";
				link.href = store.url;
				link.target = "_blank";
				link.innerHTML = `
					<img src="imgs/flags/${store.flag}.png" class="store-flag" alt="${store.flag}">
					<span class="store-label">${store.label}</span>
					<span class="store-arrow">→</span>
				`;
				link.addEventListener("click", (e) => e.stopPropagation());
				dropdown.appendChild(link);
			});

			pill.append(avatar, labelEl, dropdown);
			pill.addEventListener("click", (e) => {
				e.stopPropagation();
				const isOpen = pill.classList.contains("open");
				document
					.querySelectorAll(".artist-pill")
					.forEach((p) => p.classList.remove("open"));
				if (!isOpen) pill.classList.add("open");
			});

			container.appendChild(pill);
		});
	});
}

// ---------------------------------------------------------------------------
// ARTISTES — config avec drag & drop
// ---------------------------------------------------------------------------

function renderArtistsConfig() {
	const list = document.getElementById("artists-config-list");
	if (!list || !currentUser) return;
	list.innerHTML = "";

	const ordered = getOrderedArtists();
	const categories = {};
	const catOrder = [];
	ordered.forEach((artist) => {
		const cat = artist.category || "store";
		if (!categories[cat]) {
			categories[cat] = [];
			catOrder.push(cat);
		}
		categories[cat].push(artist);
	});

	const catLabels = { store: "Stores artistes", autres: "Autres" };
	let dragArtist = null;

	catOrder.forEach((cat) => {
		const catTitle = document.createElement("div");
		catTitle.className = "artists-config-category";
		catTitle.textContent = catLabels[cat] || cat;
		list.appendChild(catTitle);

		categories[cat].forEach((artist) => {
			const allStoreIds = artist.stores.map((s) => s.id);
			const allEnabled = allStoreIds.every((id) =>
				isStoreEnabled(currentUser, id),
			);
			const someEnabled = allStoreIds.some((id) =>
				isStoreEnabled(currentUser, id),
			);

			const artistBlock = document.createElement("div");
			artistBlock.className = "artists-config-artist";
			artistBlock.draggable = true;
			artistBlock.dataset.artistName = artist.name;

			const artistHeader = document.createElement("div");
			artistHeader.className = "artists-config-artist-header";

			const artistInfo = document.createElement("div");
			artistInfo.className = "artists-config-artist-info";

			const dragHandle = document.createElement("span");
			dragHandle.className = "artists-config-drag-handle";
			dragHandle.textContent = "⠿";
			dragHandle.title = "Réordonner";

			const initBadge = document.createElement("span");
			initBadge.className = "artists-config-initials";
			initBadge.textContent = artist.initials;
			applyArtistPhoto(initBadge, artist);

			const artistName = document.createElement("span");
			artistName.className = "artists-config-name";
			artistName.textContent = artist.name;

			artistInfo.append(dragHandle, initBadge, artistName);

			// Toggle maître
			const masterToggle = document.createElement("label");
			masterToggle.className = "toggle-switch";
			const masterInput = document.createElement("input");
			masterInput.type = "checkbox";
			masterInput.checked = someEnabled;
			masterInput.indeterminate = someEnabled && !allEnabled;
			const masterSlider = document.createElement("span");
			masterSlider.className = "toggle-slider";
			masterToggle.append(masterInput, masterSlider);

			masterInput.addEventListener("change", () => {
				const disabled = getDisabledStores(currentUser);
				if (masterInput.checked) {
					allStoreIds.forEach((id) => {
						const i = disabled.indexOf(id);
						if (i !== -1) disabled.splice(i, 1);
					});
				} else {
					allStoreIds.forEach((id) => {
						if (!disabled.includes(id)) disabled.push(id);
					});
				}
				saveDisabledStores(currentUser, disabled);
				renderArtistsConfig();
				renderArtistStores();
			});

			const expandBtn = document.createElement("button");
			expandBtn.className = "artists-config-expand";
			expandBtn.textContent = "▸";
			expandBtn.title = "Voir les stores";

			artistHeader.append(artistInfo, masterToggle, expandBtn);
			artistBlock.appendChild(artistHeader);

			// Liste des stores
			const storeList = document.createElement("div");
			storeList.className = "artists-config-stores hidden";

			artist.stores.forEach((store) => {
				const storeRow = document.createElement("div");
				storeRow.className = "artists-config-store-row";

				const storeLabel = document.createElement("span");
				storeLabel.className = "artists-config-store-label";
				storeLabel.innerHTML = `<img src="imgs/flags/${store.flag}.png" class="store-flag-mini" alt=""> ${store.label}`;

				const storeToggle = document.createElement("label");
				storeToggle.className = "toggle-switch toggle-switch-sm";
				const storeInput = document.createElement("input");
				storeInput.type = "checkbox";
				storeInput.checked = isStoreEnabled(currentUser, store.id);
				const storeSlider = document.createElement("span");
				storeSlider.className = "toggle-slider";
				storeToggle.append(storeInput, storeSlider);

				storeInput.addEventListener("change", () => {
					toggleStore(currentUser, store.id);
					renderArtistsConfig();
					renderArtistStores();
				});
				storeRow.append(storeLabel, storeToggle);
				storeList.appendChild(storeRow);
			});

			expandBtn.addEventListener("click", () => {
				const hidden = storeList.classList.toggle("hidden");
				expandBtn.textContent = hidden ? "▸" : "▾";
			});

			artistBlock.appendChild(storeList);

			// Drag & drop artistes (config)
			artistBlock.addEventListener("dragstart", (e) => {
				dragArtist = artistBlock;
				artistBlock.classList.add("artist-dragging");
				e.dataTransfer.effectAllowed = "move";
			});
			artistBlock.addEventListener("dragend", () => {
				artistBlock.classList.remove("artist-dragging");
				list
					.querySelectorAll(".artists-config-artist")
					.forEach((el) => el.classList.remove("artist-drag-over"));
				dragArtist = null;
				const newOrder = [
					...list.querySelectorAll(".artists-config-artist"),
				].map((el) => el.dataset.artistName);
				saveArtistOrder(newOrder);
				renderArtistStores();
			});
			artistBlock.addEventListener("dragover", (e) => {
				e.preventDefault();
				if (!dragArtist || dragArtist === artistBlock) return;
				list
					.querySelectorAll(".artists-config-artist")
					.forEach((el) => el.classList.remove("artist-drag-over"));
				artistBlock.classList.add("artist-drag-over");
				e.dataTransfer.dropEffect = "move";
			});
			artistBlock.addEventListener("drop", (e) => {
				e.preventDefault();
				if (!dragArtist || dragArtist === artistBlock) return;
				const mid =
					artistBlock.getBoundingClientRect().top +
					artistBlock.getBoundingClientRect().height / 2;
				e.clientY < mid
					? list.insertBefore(dragArtist, artistBlock)
					: artistBlock.after(dragArtist);
			});

			list.appendChild(artistBlock);
		});
	});
}

// ---------------------------------------------------------------------------
// PHOTO ARTISTE
// ---------------------------------------------------------------------------

function getArtistPhotoPath(artist) {
	const normalized = artist.name
		.toLowerCase()
		.replace(/\s+/g, "_")
		.replace(/[^a-z0-9_]/g, "");
	return `imgs/artists/${normalized}.jpg`;
}

function applyArtistPhoto(el, artist) {
	const img = new Image();
	img.src = getArtistPhotoPath(artist);
	img.onload = () => {
		el.style.backgroundImage = `url('${img.src}')`;
		el.style.backgroundSize = "cover";
		el.style.backgroundPosition = "center top";
		el.classList.add("has-photo");
		el.textContent = "";
	};
}

// ---------------------------------------------------------------------------
// GOOGLE LENS
// ---------------------------------------------------------------------------

function initLensModal() {
	const modal = document.getElementById("lens-modal");
	const closeBtn = document.getElementById("lens-close");
	const dropzone = document.getElementById("lens-dropzone");
	const fileInput = document.getElementById("lens-file-input");
	const uploadLink = document.getElementById("lens-upload-link");
	const preview = document.getElementById("lens-preview");
	const previewImg = document.getElementById("lens-preview-img");
	const previewRemove = document.getElementById("lens-preview-remove");
	const dropInner = document.getElementById("lens-drop-inner");
	const urlInput = document.getElementById("lens-url-input");
	const searchBtn = document.getElementById("lens-search-btn");
	let pendingFile = null;

	function resetLens() {
		pendingFile = null;
		fileInput.value = urlInput.value = "";
		previewImg.src = "";
		preview.classList.add("hidden");
		dropInner.classList.remove("hidden");
	}
	function showPreview(src) {
		previewImg.src = src;
		dropInner.classList.add("hidden");
		preview.classList.remove("hidden");
	}
	function closeLens() {
		modal.classList.add("hidden");
	}

	document.getElementById("lens-btn").addEventListener("click", () => {
		resetLens();
		modal.classList.remove("hidden");
	});
	closeBtn.addEventListener("click", closeLens);
	modal.addEventListener("click", (e) => {
		if (e.target === modal) closeLens();
	});

	dropzone.addEventListener("click", (e) => {
		if (e.target === previewRemove || !preview.classList.contains("hidden"))
			return;
		fileInput.click();
	});
	uploadLink.addEventListener("click", (e) => {
		e.stopPropagation();
		fileInput.click();
	});

	fileInput.addEventListener("change", () => {
		const file = fileInput.files[0];
		if (!file) return;
		pendingFile = file;
		urlInput.value = "";
		const reader = new FileReader();
		reader.onload = (e) => showPreview(e.target.result);
		reader.readAsDataURL(file);
	});

	dropzone.addEventListener("dragover", (e) => {
		e.preventDefault();
		dropzone.classList.add("drag-active");
	});
	["dragleave", "dragend"].forEach((ev) =>
		dropzone.addEventListener(ev, () =>
			dropzone.classList.remove("drag-active"),
		),
	);
	dropzone.addEventListener("drop", (e) => {
		e.preventDefault();
		dropzone.classList.remove("drag-active");
		const file = e.dataTransfer.files[0];
		if (!file?.type.startsWith("image/")) return;
		pendingFile = file;
		urlInput.value = "";
		const reader = new FileReader();
		reader.onload = (ev) => showPreview(ev.target.result);
		reader.readAsDataURL(file);
	});

	previewRemove.addEventListener("click", (e) => {
		e.stopPropagation();
		resetLens();
	});

	function doSearch() {
		const url = urlInput.value.trim();
		if (pendingFile) {
			const form = document.createElement("form");
			form.method = "POST";
			form.action = "https://lens.google.com/upload";
			form.enctype = "multipart/form-data";
			form.target = "_blank";
			const input = document.createElement("input");
			input.type = "file";
			input.name = "encoded_image";
			const dt = new DataTransfer();
			dt.items.add(pendingFile);
			input.files = dt.files;
			form.appendChild(input);
			document.body.appendChild(form);
			form.submit();
			document.body.removeChild(form);
			closeLens();
		} else if (url) {
			window.open(
				`https://lens.google.com/uploadbyurl?url=${encodeURIComponent(url)}`,
				"_blank",
			);
			closeLens();
		}
	}

	searchBtn.addEventListener("click", doSearch);
	urlInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") doSearch();
	});
}

// ---------------------------------------------------------------------------
// HISTORIQUE DE RECHERCHE
// ---------------------------------------------------------------------------

const SEARCH_HISTORY_KEY = "searchHistory";
const SEARCH_HISTORY_MAX = 12;

function getSearchHistory() {
	try {
		return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];
	} catch {
		return [];
	}
}
function saveSearchHistory(history) {
	localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}
function addToSearchHistory(query) {
	if (!query.trim()) return;
	let history = getSearchHistory().filter(
		(h) => h.toLowerCase() !== query.toLowerCase(),
	);
	history.unshift(query.trim());
	if (history.length > SEARCH_HISTORY_MAX)
		history = history.slice(0, SEARCH_HISTORY_MAX);
	saveSearchHistory(history);
}

function initSearchHistory() {
	const input = document.getElementById("search-input");
	const form = input.closest("form");
	const container = document.querySelector(".search-container");

	const dropdown = document.createElement("div");
	dropdown.id = "search-history-dropdown";
	dropdown.className = "search-history-dropdown hidden";
	container.appendChild(dropdown);

	let activeIndex = -1;

	function escapeHtml(str) {
		return str
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}

	function renderDropdown(filter = "") {
		const history = getSearchHistory().filter((h) =>
			h.toLowerCase().includes(filter.toLowerCase()),
		);
		if (history.length === 0) {
			closeDropdown();
			return;
		}
		dropdown.innerHTML = "";
		activeIndex = -1;

		history.forEach((query, i) => {
			const item = document.createElement("div");
			item.className = "search-history-item";

			const icon = document.createElement("span");
			icon.className = "search-history-icon";
			icon.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6a7 7 0 1 1 2.06 4.94L6.63 18.37A9 9 0 1 0 13 3z"/></svg>`;

			const text = document.createElement("span");
			text.className = "search-history-text";
			if (filter) {
				const idx = query.toLowerCase().indexOf(filter.toLowerCase());
				if (idx >= 0) {
					text.innerHTML =
						escapeHtml(query.slice(0, idx)) +
						`<mark>${escapeHtml(query.slice(idx, idx + filter.length))}</mark>` +
						escapeHtml(query.slice(idx + filter.length));
				} else {
					text.textContent = query;
				}
			} else {
				text.textContent = query;
			}

			const del = document.createElement("button");
			del.className = "search-history-delete";
			del.innerHTML = "✕";
			del.title = "Supprimer";
			del.addEventListener("click", (e) => {
				e.stopPropagation();
				saveSearchHistory(getSearchHistory().filter((_, idx) => idx !== i));
				renderDropdown(input.value);
			});

			item.append(icon, text, del);
			item.addEventListener("mousedown", (e) => {
				e.preventDefault();
				input.value = query;
				closeDropdown();
				form.submit();
			});
			dropdown.appendChild(item);
		});

		if (history.length > 1) {
			const clearAll = document.createElement("div");
			clearAll.className = "search-history-clear-all";
			clearAll.textContent = "Tout effacer";
			clearAll.addEventListener("mousedown", (e) => {
				e.preventDefault();
				saveSearchHistory([]);
				closeDropdown();
			});
			dropdown.appendChild(clearAll);
		}

		dropdown.classList.remove("hidden");
	}

	function closeDropdown() {
		dropdown.classList.add("hidden");
		activeIndex = -1;
	}

	input.addEventListener("focus", () => renderDropdown(input.value));
	input.addEventListener("input", () => renderDropdown(input.value));
	input.addEventListener("keydown", (e) => {
		const items = [...dropdown.querySelectorAll(".search-history-item")];
		if (dropdown.classList.contains("hidden") || items.length === 0) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			activeIndex = Math.min(activeIndex + 1, items.length - 1);
			items.forEach((el, i) =>
				el.classList.toggle("active", i === activeIndex),
			);
			if (activeIndex >= 0)
				input.value = items[activeIndex].querySelector(
					".search-history-text",
				).textContent;
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			activeIndex = Math.max(activeIndex - 1, -1);
			items.forEach((el, i) =>
				el.classList.toggle("active", i === activeIndex),
			);
			if (activeIndex >= 0)
				input.value = items[activeIndex].querySelector(
					".search-history-text",
				).textContent;
		} else if (e.key === "Escape") {
			closeDropdown();
		}
	});

	document.addEventListener("click", (e) => {
		if (!container.contains(e.target)) closeDropdown();
	});
	form.addEventListener("submit", () => addToSearchHistory(input.value));
}

// ---------------------------------------------------------------------------
// ADD EVENT MODAL
// ---------------------------------------------------------------------------

// Cache for event JSON artists (fetched once)
let _cachedEventArtists = null;

async function getEventArtistList() {
	if (_cachedEventArtists) return _cachedEventArtists;
	let base = [];
	try {
		const res = await fetch("events.json");
		if (res.ok) base = await res.json();
	} catch {}

	let custom = [];
	try {
		const raw = localStorage.getItem("customEvents");
		if (raw) custom = JSON.parse(raw);
	} catch {}

	let extra = [];
	try {
		const raw = localStorage.getItem("customArtists");
		if (raw) extra = JSON.parse(raw);
	} catch {}

	const all = new Map();
	for (const a of [...base, ...custom]) all.set(a.artist, a.profiles || []);
	for (const a of extra) {
		if (!all.has(a.artist)) all.set(a.artist, a.profiles || []);
	}

	_cachedEventArtists = [...all.entries()]
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([name, profiles]) => ({ name, profiles }));
	return _cachedEventArtists;
}

function initAddEventModal() {
	const modal = document.getElementById("add-event-modal");
	const formEl = document.getElementById("add-event-form");

	const FRENCH_MONTHS = [
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

	let selectedArtist = null; // { name, profiles }
	let selectedType = null; // "album" | "EP"
	let selectedMonth = null; // 1–12

	function buildForm(artistList) {
		formEl.innerHTML = "";

		// ── Artist dropdown ──
		const artistField = document.createElement("div");
		artistField.className = "event-form-field";
		const artistLabel = document.createElement("label");
		artistLabel.textContent = "Artiste";
		artistField.appendChild(artistLabel);

		const artistDdWrap = document.createElement("div");
		artistDdWrap.className = "event-form-artist-dropdown";

		const trigger = document.createElement("button");
		trigger.className = "event-form-artist-trigger";
		trigger.type = "button";
		trigger.innerHTML = `<span class="trigger-text">Choisir un artiste…</span><span class="trigger-arrow">▾</span>`;

		const list = document.createElement("div");
		list.className = "event-form-artist-list";

		for (const a of artistList) {
			const opt = document.createElement("div");
			opt.className = "event-form-artist-option";
			opt.textContent = a.name;
			opt.dataset.name = a.name;
			opt.addEventListener("mousedown", (e) => {
				e.preventDefault();
				selectArtist(a);
				artistDdWrap.classList.remove("open");
			});
			list.appendChild(opt);
		}

		// "＋ Nouvel artiste" option
		const newOpt = document.createElement("div");
		newOpt.className = "event-form-artist-option new-artist-opt";
		newOpt.textContent = "＋ Nouvel artiste";
		newOpt.addEventListener("mousedown", (e) => {
			e.preventDefault();
			artistDdWrap.classList.remove("open");
			subPanel.classList.remove("hidden");
			subPanelInput.focus();
		});
		list.appendChild(newOpt);

		trigger.addEventListener("click", (e) => {
			e.stopPropagation();
			artistDdWrap.classList.toggle("open");
		});

		artistDdWrap.appendChild(trigger);
		artistDdWrap.appendChild(list);
		artistField.appendChild(artistDdWrap);

		// Sub-panel for new artist
		const subPanel = document.createElement("div");
		subPanel.className = "event-form-sub-panel hidden";

		const subPanelInput = document.createElement("input");
		subPanelInput.type = "text";
		subPanelInput.placeholder = "Nom de l'artiste";
		subPanelInput.autocomplete = "off";
		subPanelInput.spellcheck = false;
		subPanel.appendChild(subPanelInput);

		const profilesWrap = document.createElement("div");
		profilesWrap.className = "event-form-sub-panel-profiles";
		const cbCarotte = document.createElement("input");
		cbCarotte.type = "checkbox";
		cbCarotte.id = "new-artist-carotte";
		cbCarotte.checked = true;
		const lblCarotte = document.createElement("label");
		lblCarotte.htmlFor = "new-artist-carotte";
		lblCarotte.appendChild(cbCarotte);
		lblCarotte.appendChild(document.createTextNode(" Carotte"));

		const cbAlex = document.createElement("input");
		cbAlex.type = "checkbox";
		cbAlex.id = "new-artist-alex";
		cbAlex.checked = true;
		const lblAlex = document.createElement("label");
		lblAlex.htmlFor = "new-artist-alex";
		lblAlex.appendChild(cbAlex);
		lblAlex.appendChild(document.createTextNode(" Alex"));

		profilesWrap.append(lblCarotte, lblAlex);
		subPanel.appendChild(profilesWrap);

		const addArtistBtn = document.createElement("button");
		addArtistBtn.type = "button";
		addArtistBtn.className = "event-form-sub-panel-add";
		addArtistBtn.textContent = "Ajouter";
		addArtistBtn.addEventListener("click", () => {
			const name = subPanelInput.value.trim();
			if (!name) return;
			const profs = [];
			if (cbCarotte.checked) profs.push("Carotte");
			if (cbAlex.checked) profs.push("Alex");

			// Save to localStorage.customArtists
			let customArtists = [];
			try {
				customArtists = JSON.parse(
					localStorage.getItem("customArtists") || "[]",
				);
			} catch {}
			if (!customArtists.find((a) => a.artist === name)) {
				customArtists.push({ artist: name, profiles: profs });
				localStorage.setItem("customArtists", JSON.stringify(customArtists));
			}

			// Reset cache so the new artist appears next time
			_cachedEventArtists = null;

			// Select the new artist
			const newArtist = { name, profiles: profs };

			// Add to current dropdown list (re-insert alphabetically)
			const existing = list.querySelector(`[data-name="${name}"]`);
			if (!existing) {
				const opt = document.createElement("div");
				opt.className = "event-form-artist-option";
				opt.textContent = name;
				opt.dataset.name = name;
				opt.addEventListener("mousedown", (ev) => {
					ev.preventDefault();
					selectArtist(newArtist);
					artistDdWrap.classList.remove("open");
				});
				// Insert alphabetically before newOpt
				list.insertBefore(opt, newOpt);
			}

			selectArtist(newArtist);
			subPanel.classList.add("hidden");
			subPanelInput.value = "";
		});
		subPanel.appendChild(addArtistBtn);
		artistField.appendChild(subPanel);
		formEl.appendChild(artistField);

		// ── Type toggle ──
		const typeField = document.createElement("div");
		typeField.className = "event-form-field";
		const typeLabel = document.createElement("label");
		typeLabel.textContent = "Type";
		typeField.appendChild(typeLabel);

		const typeToggle = document.createElement("div");
		typeToggle.className = "event-form-type-toggle";

		for (const t of ["album", "EP", "Single"]) {
			const btn = document.createElement("button");
			btn.type = "button";
			btn.className = "event-form-type-btn";
			btn.textContent = t === "album" ? "Album" : t;
			btn.dataset.type = t;
			if (t === "Single") btn.disabled = true;
			btn.addEventListener("click", () => {
				typeToggle
					.querySelectorAll(".event-form-type-btn")
					.forEach((b) => b.classList.remove("active"));
				btn.classList.add("active");
				selectedType = t;
			});
			typeToggle.appendChild(btn);
		}
		typeField.appendChild(typeToggle);
		formEl.appendChild(typeField);

		// ── Release name ──
		const nameField = document.createElement("div");
		nameField.className = "event-form-field";
		const nameLbl = document.createElement("label");
		nameLbl.textContent = "Titre";
		nameField.appendChild(nameLbl);
		const nameInput = document.createElement("input");
		nameInput.type = "text";
		nameInput.id = "event-form-name";
		nameInput.className = "event-form-input";
		nameInput.placeholder = "Nom de la sortie";
		nameInput.autocomplete = "off";
		nameInput.spellcheck = false;
		nameField.appendChild(nameInput);
		formEl.appendChild(nameField);

		// ── Label (optional) ──
		const labelField = document.createElement("div");
		labelField.className = "event-form-field";
		const labelLbl = document.createElement("label");
		labelLbl.textContent = "Label (optionnel)";
		labelField.appendChild(labelLbl);
		const labelInput = document.createElement("input");
		labelInput.type = "text";
		labelInput.id = "event-form-label";
		labelInput.className = "event-form-input";
		labelInput.placeholder = "ex: Taylor's Version, Deluxe…";
		labelInput.autocomplete = "off";
		labelInput.spellcheck = false;
		labelField.appendChild(labelInput);
		formEl.appendChild(labelField);

		// ── Date ──
		const dateField = document.createElement("div");
		dateField.className = "event-form-field";
		const dateLbl = document.createElement("label");
		dateLbl.textContent = "Date de sortie";
		dateField.appendChild(dateLbl);

		const dateRow = document.createElement("div");
		dateRow.className = "event-form-date-row";

		const dayInput = document.createElement("input");
		dayInput.type = "number";
		dayInput.id = "event-form-day";
		dayInput.className = "event-form-day";
		dayInput.min = 1;
		dayInput.max = 31;
		dayInput.placeholder = "JJ";

		// Month custom dropdown
		const monthWrap = document.createElement("div");
		monthWrap.className = "event-form-month-wrap";

		const monthTrigger = document.createElement("button");
		monthTrigger.type = "button";
		monthTrigger.className = "event-form-month-trigger";
		monthTrigger.innerHTML = `<span class="month-text">Mois</span><span class="trigger-arrow">▾</span>`;

		const monthList = document.createElement("div");
		monthList.className = "event-form-month-list";

		FRENCH_MONTHS.forEach((m, i) => {
			const opt = document.createElement("div");
			opt.className = "event-form-month-option";
			opt.textContent = m;
			opt.dataset.value = String(i + 1);
			opt.addEventListener("mousedown", (e) => {
				e.preventDefault();
				selectedMonth = i + 1;
				monthTrigger.querySelector(".month-text").textContent = m;
				monthList
					.querySelectorAll(".event-form-month-option")
					.forEach((o) => o.classList.remove("selected"));
				opt.classList.add("selected");
				monthWrap.classList.remove("open");
			});
			monthList.appendChild(opt);
		});

		monthTrigger.addEventListener("click", (e) => {
			e.stopPropagation();
			monthWrap.classList.toggle("open");
		});

		monthWrap.appendChild(monthTrigger);
		monthWrap.appendChild(monthList);

		const yearInput = document.createElement("input");
		yearInput.type = "number";
		yearInput.id = "event-form-year";
		yearInput.className = "event-form-year";
		yearInput.min = 1950;
		yearInput.max = 2099;
		yearInput.placeholder = "AAAA";

		dateRow.append(dayInput, monthWrap, yearInput);
		dateField.appendChild(dateRow);
		formEl.appendChild(dateField);

		// Close dropdowns on outside click (within modal)
		modal.addEventListener("click", () => {
			artistDdWrap.classList.remove("open");
			monthWrap.classList.remove("open");
		});

		function selectArtist(a) {
			selectedArtist = a;
			trigger.querySelector(".trigger-text").textContent = a.name;
			list.querySelectorAll(".event-form-artist-option").forEach((o) => {
				o.classList.toggle("selected", o.dataset.name === a.name);
			});
		}
	}

	// Open modal
	document
		.getElementById("add-event-btn")
		.addEventListener("click", async () => {
			// Reset state
			selectedArtist = null;
			selectedType = null;
			selectedMonth = null;

			const artistList = await getEventArtistList();
			buildForm(artistList);

			modal.classList.remove("hidden");
		});

	// Cancel
	document.getElementById("add-event-cancel").addEventListener("click", () => {
		modal.classList.add("hidden");
	});
	modal.addEventListener("click", (e) => {
		if (e.target === modal) modal.classList.add("hidden");
	});

	// Confirm
	document
		.getElementById("add-event-confirm")
		.addEventListener("click", async () => {
			// Gather values
			const nameVal = document.getElementById("event-form-name")?.value.trim();
			const labelVal =
				document.getElementById("event-form-label")?.value.trim() || null;
			const dayVal = parseInt(document.getElementById("event-form-day")?.value);
			const yearVal = parseInt(
				document.getElementById("event-form-year")?.value,
			);

			// Validate
			let valid = true;

			if (!selectedArtist) {
				valid = false;
			}
			if (!selectedType) {
				valid = false;
			}
			if (!nameVal) {
				const el = document.getElementById("event-form-name");
				if (el) {
					el.classList.add("error");
					setTimeout(() => el.classList.remove("error"), 1500);
				}
				valid = false;
			}
			if (!selectedMonth || isNaN(dayVal) || dayVal < 1 || dayVal > 31) {
				const el = document.getElementById("event-form-day");
				if (el) {
					el.classList.add("error");
					setTimeout(() => el.classList.remove("error"), 1500);
				}
				valid = false;
			}
			if (isNaN(yearVal) || yearVal < 1950 || yearVal > 2099) {
				const el = document.getElementById("event-form-year");
				if (el) {
					el.classList.add("error");
					setTimeout(() => el.classList.remove("error"), 1500);
				}
				valid = false;
			}
			if (!valid) return;

			// Build release object
			const newRelease = {
				name: nameVal,
				type: selectedType,
				label: labelVal || null,
				release_date: { month: selectedMonth, day: dayVal, year: yearVal },
			};

			// Load & update customEvents
			let customEvents = [];
			try {
				customEvents = JSON.parse(localStorage.getItem("customEvents") || "[]");
			} catch {}

			const existing = customEvents.find(
				(a) => a.artist === selectedArtist.name,
			);
			if (existing) {
				existing.discography.push(newRelease);
			} else {
				customEvents.push({
					artist: selectedArtist.name,
					profiles: selectedArtist.profiles,
					discography: [newRelease],
				});
			}
			localStorage.setItem("customEvents", JSON.stringify(customEvents));

			// Reload events and refresh UI
			await loadAllEvents();
			checkTsEvents();
			renderCountdown();

			// Close & reset
			modal.classList.add("hidden");
			formEl.innerHTML = "";
		});
}

// ---------------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------------

window.onload = async () => {
	initUserSelector();
	initShortcutModal();
	initConfigModal();
	initLensModal();
	initContextMenu();
	initEditShortcutModal();
	initFolderModal();

	// Chargement des événements depuis events.json (source unique)
	await loadAllEvents();

	const savedUser = localStorage.getItem("currentUser");
	if (savedUser && profiles[savedUser]) {
		document.getElementById("user-selector").classList.add("hidden");
		loadProfile(savedUser);
	} else {
		document.getElementById("user-selector").classList.remove("hidden");
	}

	setInterval(updateClock, 1000);
	updateClock();
	checkTsEvents();
	initArtistStores();
	initSearchHistory();
	initAddEventModal();

	document
		.getElementById("switch-profile-btn")
		.addEventListener("click", () => {
			initUserSelector();
			document.getElementById("user-selector").classList.remove("hidden");
		});

	document.getElementById("search-input").focus();
};

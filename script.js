const profiles = {
	Carotte: {
		backgrounds: [
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
		],
	},
	Alex: {
		backgrounds: [
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
			"50.webp",
			"51.webp",
			"52.webp",
			"53.webp",
			"54.webp",
			"55.webp",
			"56.webp",
			"57.webp",
			"58.webp",
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
		],
	},
};

// ---------------------------------------------------------------------------
// ARTISTES & STORES — tableau unique
// Ajoute ici tous les artistes, peu importe le profil.
// category: "store" | "autres"
// Chaque user peut désactiver des stores individuellement via la config.
// ---------------------------------------------------------------------------
const artists = [
	{
		name: "Taylor Swift",
		initials: "TS",
		category: "store",
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

	// Exemple d'artiste dans la catégorie "autres" :
	// {
	//   name: "Bad World",
	//   initials: "BW",
	//   category: "autres",
	//   stores: [
	//     { id: "bw_fr", label: "Store FR", flag: "fr", url: "https://..." },
	//   ],
	// },
];

let currentUser = null;

// --- LocalStorage helpers ---
function getShortcuts(user) {
	try {
		return JSON.parse(localStorage.getItem(`shortcuts_${user}`)) || [];
	} catch {
		return [];
	}
}

function saveShortcuts(user, shortcuts) {
	localStorage.setItem(`shortcuts_${user}`, JSON.stringify(shortcuts));
}

function getDisplayName(user) {
	return localStorage.getItem(`displayName_${user}`) || user;
}

function saveDisplayName(user, name) {
	localStorage.setItem(`displayName_${user}`, name);
}

// --- Message de bienvenue ---
function updateWelcome(user) {
	const h = new Date().getHours();
	let greeting, emoji;
	if (h >= 5 && h < 12) {
		greeting = "Bonjour";
		emoji = "☀️";
	} else if (h >= 12 && h < 18) {
		greeting = "Bon après-midi";
		emoji = "🌤️";
	} else if (h >= 18 && h < 22) {
		greeting = "Bonsoir";
		emoji = "🌙";
	} else {
		greeting = "Bonne nuit";
		emoji = "🌙";
	}

	const name = getDisplayName(user);
	const el = document.getElementById("welcome-msg");
	if (el) el.textContent = `${greeting}, ${name} ${emoji}`;
}

// --- Drag & drop ---
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

		// Récupère l'ordre depuis le DOM
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

// --- Rendu des raccourcis ---
function renderShortcuts(user) {
	const shortcuts = getShortcuts(user);
	const container = document.getElementById("shortcuts");
	container.innerHTML = "";

	shortcuts.forEach((s, i) => {
		const icon = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(s.url).hostname}`;
		const link = document.createElement("a");
		link.className = "shortcut-item";
		link.href = s.url;
		link.draggable = true;
		link.style.animationDelay = `${i * 0.08}s`;

		const removeBtn = document.createElement("button");
		removeBtn.className = "shortcut-remove";
		removeBtn.textContent = "✕";
		removeBtn.title = "Supprimer";
		removeBtn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const updated = getShortcuts(user).filter((_, idx) => idx !== i);
			saveShortcuts(user, updated);
			renderShortcuts(user);
		});

		link.innerHTML = `<div class="icon-wrapper"><img src="${icon}"></div><span>${s.name}</span>`;
		link.appendChild(removeBtn);
		container.appendChild(link);
	});

	initDragDrop(container, user);
}

// --- Theme color navigateur ---
function extractDominantColor(imgSrc, callback) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const img = new Image();
	img.crossOrigin = "anonymous";
	img.onload = () => {
		// On sample une petite version pour la perf
		canvas.width = 50;
		canvas.height = 50;
		ctx.drawImage(img, 0, 0, 50, 50);

		const data = ctx.getImageData(0, 0, 50, 50).data;
		let r = 0,
			g = 0,
			b = 0,
			count = 0;

		// Moyenne des pixels (on skip les trop sombres et trop clairs)
		for (let i = 0; i < data.length; i += 4) {
			const pr = data[i],
				pg = data[i + 1],
				pb = data[i + 2];
			const brightness = (pr + pg + pb) / 3;
			if (brightness < 20 || brightness > 235) continue;
			r += pr;
			g += pg;
			b += pb;
			count++;
		}

		if (count === 0) {
			callback("#000000");
			return;
		}
		r = Math.round(r / count);
		g = Math.round(g / count);
		b = Math.round(b / count);

		// On assombrit un peu pour que ce soit plus élégant en barre de nav
		r = Math.round(r * 0.6);
		g = Math.round(g * 0.6);
		b = Math.round(b * 0.6);

		callback(`rgb(${r},${g},${b})`);
	};
	img.onerror = () => callback("#000000");
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

// --- Chargement du profil ---
function loadProfile(name) {
	const data = profiles[name];
	if (!data) return;
	currentUser = name;

	const randomImg =
		data.backgrounds[Math.floor(Math.random() * data.backgrounds.length)];
	const bgElement = document.getElementById("bg");
	const img = new Image();
	img.src = `backgrounds/${randomImg}`;
	img.onload = () => {
		bgElement.style.backgroundImage = `url('${img.src}')`;
		bgElement.style.opacity = "1";
		extractDominantColor(img.src, setThemeColor);
	};

	updateWelcome(name);
	renderShortcuts(name);
	renderArtistStores();
	document.getElementById("search-input").focus();
}

// --- Horloge ---
function updateClock() {
	const now = new Date();
	const s = now.getSeconds(),
		m = now.getMinutes(),
		h = now.getHours();
	const mDeg = m * 6 + s * 0.1;
	const hDeg = (h % 12) * 30 + m * 0.5;

	const hourG = document.getElementById("hour-g");
	const minG = document.getElementById("minute-g");
	if (hourG) hourG.setAttribute("transform", `rotate(${hDeg}, 100, 100)`);
	if (minG) minG.setAttribute("transform", `rotate(${mDeg}, 100, 100)`);

	const day = String(now.getDate()).padStart(2, "0");
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const year = now.getFullYear();
	const left = document.getElementById("date-left");
	const right = document.getElementById("date-right");
	if (left) left.textContent = `${day}/${month}`;
	if (right) right.textContent = year;
}

// --- Sélecteur de profil ---
function initUserSelector() {
	const btnContainer = document.querySelector(".user-buttons");
	if (!btnContainer) return;
	btnContainer.innerHTML = "";
	Object.keys(profiles).forEach((name) => {
		const btn = document.createElement("button");
		btn.textContent = getDisplayName(name);
		btn.addEventListener("click", () => {
			localStorage.setItem("currentUser", name);
			document.getElementById("user-selector").classList.add("hidden");
			loadProfile(name);
		});
		btnContainer.appendChild(btn);
	});
}

// --- Modale ajout raccourci ---
function initShortcutModal() {
	const modal = document.getElementById("shortcut-modal");
	const nameInput = document.getElementById("shortcut-name");
	const urlInput = document.getElementById("shortcut-url");

	document.getElementById("add-shortcut-btn").addEventListener("click", () => {
		nameInput.value = "";
		urlInput.value = "";
		modal.classList.remove("hidden");
		nameInput.focus();
	});

	document
		.getElementById("shortcut-cancel")
		.addEventListener("click", () => modal.classList.add("hidden"));

	document.getElementById("shortcut-confirm").addEventListener("click", () => {
		let name = nameInput.value.trim();
		let url = urlInput.value.trim();
		if (!name || !url) return;
		if (!/^https?:\/\//i.test(url)) url = "https://" + url;
		const shortcuts = getShortcuts(currentUser);
		shortcuts.push({ name, url });
		saveShortcuts(currentUser, shortcuts);
		renderShortcuts(currentUser);
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

// --- Modale config ---
function initConfigModal() {
	const modal = document.getElementById("config-modal");

	document.getElementById("config-btn").addEventListener("click", () => {
		document.getElementById("config-profile-name").value =
			getDisplayName(currentUser);
		// Reset onglet actif
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

	// Onglets — délégation sur le conteneur
	modal.querySelector(".config-tabs").addEventListener("click", (e) => {
		const tab = e.target.closest(".config-tab");
		if (!tab) return;
		const tabName = tab.dataset.tab;
		modal
			.querySelectorAll(".config-tab")
			.forEach((t) => t.classList.remove("active"));
		["tab-profil", "tab-artistes"].forEach((id) => {
			const el = document.getElementById(id);
			if (el) el.classList.add("hidden");
		});
		tab.classList.add("active");
		const target = document.getElementById("tab-" + tabName);
		if (target) target.classList.remove("hidden");
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
		// Met à jour les boutons du sélecteur de profil
		initUserSelector();
		// Feedback visuel
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
}

// ---------------------------------------------------------------------------
// ÉVÉNEMENTS — ajoute ici tes dates { month, day, year, text }
// "il y a {n} ans" est inséré automatiquement dans le texte
// ---------------------------------------------------------------------------
const EventsOut = [
	{
		month: 10,
		day: 24,
		year: 2006,
		text: "Taylor Swift sortait son premier album Début il y a {n} ans 🎸",
	},
	{
		month: 11,
		day: 11,
		year: 2008,
		text: "Taylor Swift sortait son album Fearless il y a {n} ans 🌟",
	},
	{
		month: 10,
		day: 25,
		year: 2010,
		text: "Taylor Swift sortait son album Speak Now il y a {n} ans 🎤",
	},
	{
		month: 10,
		day: 22,
		year: 2012,
		text: "Taylor Swift sortait son album Red il y a {n} ans ❤️",
	},
	{
		month: 10,
		day: 27,
		year: 2014,
		text: "Taylor Swift sortait son album 1989 il y a {n} ans 🏙️",
	},
	{
		month: 11,
		day: 10,
		year: 2017,
		text: "Taylor Swift sortait son album Reputation il y a {n} ans 🐍",
	},
	{
		month: 8,
		day: 23,
		year: 2019,
		text: "Taylor Swift sortait son album Lover il y a {n} ans 💖",
	},
	{
		month: 7,
		day: 24,
		year: 2020,
		text: "Taylor Swift sortait son album Folklore il y a {n} ans 🌲",
	},
	{
		month: 12,
		day: 11,
		year: 2020,
		text: "Taylor Swift sortait son album Evermore il y a {n} ans 🌨️",
	},
	{
		month: 4,
		day: 9,
		year: 2021,
		text: "Taylor Swift sortait la Taylor's Version de Fearless il y a {n} ans 🌙",
	},
	{
		month: 11,
		day: 12,
		year: 2021,
		text: "Taylor Swift sortait la Taylor's Version de Red il y a {n} ans 🍎",
	},
	{
		month: 10,
		day: 22,
		year: 2022,
		text: "Taylor Swift sortait son album Midnights il y a {n} ans 🌌",
	},
	{
		month: 7,
		day: 7,
		year: 2023,
		text: "Taylor Swift sortait la Taylor's Version de Speak Now il y a {n} ans 🎤",
	},
	{
		month: 10,
		day: 27,
		year: 2023,
		text: "Taylor Swift sortait la Taylor's Version de 1989 il y a {n} ans 🏙️",
	},
	{
		month: 4,
		day: 19,
		year: 2024,
		text: "Taylor Swift sortait son album The Tortured Poets Department il y a {n} ans 🌙",
	},
	{
		month: 10,
		day: 3,
		year: 2025,
		text: "Taylor Swift sortait son album The Life of a Showgirl il y a {n} ans 🌙",
	},
	{
		month: 7,
		day: 14,
		year: 2020,
		text: "Gracie Abrams sortait son premier EP Minor il y a {n} ans 🌙",
	},
	{
		month: 11,
		day: 12,
		year: 2021,
		text: "Gracie Abrams sortait son deuxième EP This Is What It Feels Like il y a {n} ans 🌙",
	},
	{
		month: 2,
		day: 24,
		year: 2023,
		text: "Gracie Abrams sortait son premier album Good Riddance il y a {n} ans 🌙",
	},
	{
		month: 6,
		day: 24,
		year: 2024,
		text: "Gracie Abrams sortait son deuxième album The Secret of Us il y a {n} ans 🌙",
	},
	{
		month: 4,
		day: 14,
		year: 2015,
		text: "Sabrina Carpenter sortait son premier album Eyes Wide Open 🏆",
	},
	{
		month: 10,
		day: 14,
		year: 2016,
		text: "Sabrina Carpenter sortait son deuxième album Evolution  🌟",
	},
	{
		month: 11,
		day: 9,
		year: 2018,
		text: "Sabrina Carpenter sortait son troisième album Singular: Act I  🌙",
	},
	{
		month: 7,
		day: 19,
		year: 2019,
		text: "Sabrina Carpenter sortait son quatrième album Singular: Act II  🌙",
	},
	{
		month: 7,
		day: 15,
		year: 2022,
		text: "Sabrina Carpenter sortait son cinquième album Emails I Can't Send  🌙",
	},
	{
		month: 8,
		day: 23,
		year: 2024,
		text: "Sabrina Carpenter sortait son sixième album Short n' Sweet  🌙",
	},
	{
		month: 8,
		day: 29,
		year: 2025,
		text: "Sabrina Carpenter sortait son sixième album Man's Best Friend  🌙",
	},
	{
		month: 4,
		day: 8,
		year: 2014,
		text: "Sabrina Carpenter sortait son premier EP Can't Blame a Girl for Trying 🏆",
	},
	{
		month: 8,
		day: 11,
		year: 2017,
		text: "Sabrina Carpenter sortait son deuxième EP Pandora Sessions  🌟",
	},
	{
		month: 11,
		day: 17,
		year: 2023,
		text: "Sabrina Carpenter sortait son troisième EP Fruitcake  🌙",
	},
	{
		month: 11,
		day: 18,
		year: 2011,
		text: "One Direction sortaient leur premier album Up All Night 🌟",
	},
	{
		month: 11,
		day: 9,
		year: 2012,
		text: "One Direction sortaient leur deuxième album Take Me Home 🌟",
	},
	{
		month: 11,
		day: 25,
		year: 2013,
		text: "One Direction sortaient leur troisième album Midnight Memories 🌟",
	},
	{
		month: 11,
		day: 17,
		year: 2014,
		text: "One Direction sortaient leur quatrième album Four 🌟",
	},
	{
		month: 11,
		day: 13,
		year: 2015,
		text: "One Direction sortaient leur cinquième album Made in the A.M. 🌟",
	},
	{
		month: 9,
		day: 20,
		year: 2012,
		text: "One Direction sortaient leur EP iTunes Festival: London 2012 🌟",
	},
	{
		month: 9,
		day: 28,
		year: 2012,
		text: "One Direction sortaient leur EP Live While We're Young🌟",
	},
	{
		month: 10,
		day: 20,
		year: 2017,
		text: "Niall Horan sortait son premier album Flicker 🌟",
	},
	{
		month: 3,
		day: 13,
		year: 2020,
		text: "Niall Horan sortait son deuxième album Heartbreak Weather 🌟",
	},
	{
		month: 6,
		day: 9,
		year: 2023,
		text: "Niall Horan sortait son troisième album The Show 🌟",
	},
	{
		month: 6,
		day: 5,
		year: 2026,
		text: "Niall Horan sortait son quatrième album Dinner Party 🌟",
	},
	{
		month: 4,
		day: 21,
		year: 2018,
		text: "Niall Horan sortait son premier EP Mirrors 🌟",
	},
	{
		month: 1,
		day: 31,
		year: 2020,
		text: "Louis Tomlinson sortait son premier album Walls 🌟",
	},
	{
		month: 11,
		day: 11,
		year: 2022,
		text: "Louis Tomlinson sortait son deuxième album Faith in the Future 🌟",
	},
	{
		month: 1,
		day: 23,
		year: 2026,
		text: "Louis Tomlinson sortait son troisième album How Did I Get Here? 🌟",
	},
	{
		month: 5,
		day: 12,
		year: 2017,
		text: "Harry Styles sortait son premier album Harry Styles 🌟",
	},
	{
		month: 12,
		day: 13,
		year: 2019,
		text: "Harry Styles sortait son deuxième album Fine Line 🌟",
	},
	{
		month: 5,
		day: 20,
		year: 2022,
		text: "Harry Styles sortait son troisième album Harry's House 🌟",
	},
	{
		month: 3,
		day: 6,
		year: 2026,
		text: "Harry Styles sortait son quatrième album Kiss All the Time. Disco, Occasionally.🌟",
	},
	{
		month: 3,
		day: 25,
		year: 2016,
		text: "Zayn Malik sortait son premier album Mind of Mine 🌟",
	},
	{
		month: 12,
		day: 14,
		year: 2018,
		text: "Zayn Malik sortait son deuxième album Icarus Falls 🌟",
	},
	{
		month: 1,
		day: 15,
		year: 2021,
		text: "Zayn Malik sortait son troisième album Nobody Is Listening 🌟",
	},
	{
		month: 5,
		day: 17,
		year: 2024,
		text: "Zayn Malik sortait son quatrième album Room Under the Stairs 🌟",
	},
	{
		month: 4,
		day: 17,
		year: 2026,
		text: "Zayn Malik sortait son cinquième album Konnakol 🌟",
	},
	{
		month: 12,
		day: 6,
		year: 2019,
		text: "Liam Payne sortait son premier album LP1 🌟",
	},
	{
		month: 8,
		day: 24,
		year: 2018,
		text: "Liam Payne sortait son premier EP First Time 🌟",
	},
	{
		month: 10,
		day: 9,
		year: 2020,
		text: "Liam Payne sortait son deuxième EP Midnight Hour🌟",
	},
];

function checkTsEvents() {
	const now = new Date();
	const day = now.getDate();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();

	const banner = document.getElementById("ts-event-banner");
	if (!banner) return;

	const matches = EventsOut.filter(
		(e) => e.month === month && e.day === day && e.year < year,
	).sort((a, b) => b.year - a.year);

	if (matches.length === 0) {
		banner.classList.add("hidden");
		return;
	}

	banner.innerHTML = matches
		.map((e) => {
			const n = year - e.year;
			const text = e.text.replace("{n}", `${n} an${n > 1 ? "s" : ""}`);
			return `<span>🎂 Il y a ${n} an${n > 1 ? "s" : ""} : ${text}</span>`;
		})
		.join("");

	banner.classList.remove("hidden");
}

// --- Helpers désactivation stores ---
function getDisabledStores(user) {
	try {
		return JSON.parse(localStorage.getItem(`disabledStores_${user}`)) || [];
	} catch {
		return [];
	}
}

function saveDisabledStores(user, list) {
	localStorage.setItem(`disabledStores_${user}`, JSON.stringify(list));
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

// --- Rendu du menu artistes (sidebar) ---
function initArtistStores() {
	renderArtistStores();

	// Ferme au clic outside
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

	// Grouper par catégorie
	const categories = {};
	artists.forEach((artist) => {
		const cat = artist.category || "store";
		if (!categories[cat]) categories[cat] = [];
		categories[cat].push(artist);
	});

	Object.entries(categories).forEach(([, artistList]) => {
		artistList.forEach((artist) => {
			// Filtrer les stores actifs pour ce user
			const activeStores = artist.stores.filter((s) =>
				isStoreEnabled(currentUser, s.id),
			);
			// Si aucun store actif, on n'affiche pas la pill
			if (activeStores.length === 0) return;

			const pill = document.createElement("div");
			pill.className = "artist-pill";

			const avatar = document.createElement("div");
			avatar.className = "artist-avatar";
			avatar.textContent = artist.initials;

			const labelEl = document.createElement("div");
			labelEl.className = "artist-label";
			labelEl.textContent = artist.name;

			const dropdown = document.createElement("div");
			dropdown.className = "store-dropdown";

			const header = document.createElement("div");
			header.className = "dropdown-header";

			const title = document.createElement("span");
			title.className = "dropdown-title";
			title.textContent = artist.name;

			const openAllBtn = document.createElement("button");
			openAllBtn.className = "open-all-btn";
			openAllBtn.textContent = "Tout ouvrir";
			openAllBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				activeStores.forEach((s) => window.open(s.url, "_blank"));
			});

			header.appendChild(title);
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

			pill.appendChild(avatar);
			pill.appendChild(labelEl);
			pill.appendChild(dropdown);

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

// --- Rendu de la config artistes ---
function renderArtistsConfig() {
	const list = document.getElementById("artists-config-list");
	if (!list || !currentUser) return;
	list.innerHTML = "";

	// Grouper par catégorie
	const categories = {};
	artists.forEach((artist) => {
		const cat = artist.category || "store";
		if (!categories[cat]) categories[cat] = [];
		categories[cat].push(artist);
	});

	const catLabels = { store: "Stores artistes", autres: "Autres" };

	Object.entries(categories).forEach(([cat, artistList]) => {
		const catTitle = document.createElement("div");
		catTitle.className = "artists-config-category";
		catTitle.textContent = catLabels[cat] || cat;
		list.appendChild(catTitle);

		artistList.forEach((artist) => {
			const allStoreIds = artist.stores.map((s) => s.id);
			const allEnabled = allStoreIds.every((id) =>
				isStoreEnabled(currentUser, id),
			);
			const someEnabled = allStoreIds.some((id) =>
				isStoreEnabled(currentUser, id),
			);

			// Bloc artiste
			const artistBlock = document.createElement("div");
			artistBlock.className = "artists-config-artist";

			// Header artiste avec toggle master
			const artistHeader = document.createElement("div");
			artistHeader.className = "artists-config-artist-header";

			const artistInfo = document.createElement("div");
			artistInfo.className = "artists-config-artist-info";

			const initBadge = document.createElement("span");
			initBadge.className = "artists-config-initials";
			initBadge.textContent = artist.initials;

			const artistName = document.createElement("span");
			artistName.className = "artists-config-name";
			artistName.textContent = artist.name;

			artistInfo.appendChild(initBadge);
			artistInfo.appendChild(artistName);

			// Toggle master artiste
			const masterToggle = document.createElement("label");
			masterToggle.className = "toggle-switch";
			const masterInput = document.createElement("input");
			masterInput.type = "checkbox";
			masterInput.checked = someEnabled;
			masterInput.indeterminate = someEnabled && !allEnabled;
			const masterSlider = document.createElement("span");
			masterSlider.className = "toggle-slider";
			masterToggle.appendChild(masterInput);
			masterToggle.appendChild(masterSlider);

			masterInput.addEventListener("change", () => {
				const disabled = getDisabledStores(currentUser);
				if (masterInput.checked) {
					// Activer tous
					allStoreIds.forEach((id) => {
						const idx = disabled.indexOf(id);
						if (idx !== -1) disabled.splice(idx, 1);
					});
				} else {
					// Désactiver tous
					allStoreIds.forEach((id) => {
						if (!disabled.includes(id)) disabled.push(id);
					});
				}
				saveDisabledStores(currentUser, disabled);
				renderArtistsConfig();
				renderArtistStores();
			});

			// Bouton expand stores
			const expandBtn = document.createElement("button");
			expandBtn.className = "artists-config-expand";
			expandBtn.textContent = "▸";
			expandBtn.title = "Voir les stores";

			artistHeader.appendChild(artistInfo);
			artistHeader.appendChild(masterToggle);
			artistHeader.appendChild(expandBtn);
			artistBlock.appendChild(artistHeader);

			// Liste des stores (masquée par défaut)
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
				storeToggle.appendChild(storeInput);
				storeToggle.appendChild(storeSlider);

				storeInput.addEventListener("change", () => {
					toggleStore(currentUser, store.id);
					renderArtistsConfig();
					renderArtistStores();
				});

				storeRow.appendChild(storeLabel);
				storeRow.appendChild(storeToggle);
				storeList.appendChild(storeRow);
			});

			expandBtn.addEventListener("click", () => {
				const hidden = storeList.classList.toggle("hidden");
				expandBtn.textContent = hidden ? "▸" : "▾";
			});

			artistBlock.appendChild(storeList);
			list.appendChild(artistBlock);
		});
	});
}

// --- Google Lens Modal ---
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
		fileInput.value = "";
		urlInput.value = "";
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

	// Ouvrir
	document.getElementById("lens-btn").addEventListener("click", () => {
		resetLens();
		modal.classList.remove("hidden");
	});

	// Fermer
	closeBtn.addEventListener("click", closeLens);
	modal.addEventListener("click", (e) => {
		if (e.target === modal) closeLens();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && !modal.classList.contains("hidden")) closeLens();
	});

	// Clic sur dropzone → ouvre file picker (sauf si preview visible)
	dropzone.addEventListener("click", (e) => {
		if (e.target === previewRemove) return;
		if (!preview.classList.contains("hidden")) return;
		fileInput.click();
	});

	// Clic sur "importez un fichier"
	uploadLink.addEventListener("click", (e) => {
		e.stopPropagation();
		fileInput.click();
	});

	// Sélection fichier
	fileInput.addEventListener("change", () => {
		const file = fileInput.files[0];
		if (!file) return;
		pendingFile = file;
		urlInput.value = "";
		const reader = new FileReader();
		reader.onload = (e) => showPreview(e.target.result);
		reader.readAsDataURL(file);
	});

	// Drag & drop
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
		if (!file || !file.type.startsWith("image/")) return;
		pendingFile = file;
		urlInput.value = "";
		const reader = new FileReader();
		reader.onload = (ev) => showPreview(ev.target.result);
		reader.readAsDataURL(file);
	});

	// Supprimer preview
	previewRemove.addEventListener("click", (e) => {
		e.stopPropagation();
		resetLens();
	});

	// Recherche
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

// --- Init ---
window.onload = () => {
	initUserSelector();
	initShortcutModal();
	initConfigModal();
	initLensModal();

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

	document
		.getElementById("switch-profile-btn")
		.addEventListener("click", () => {
			initUserSelector(); // refresh les noms affichés
			document.getElementById("user-selector").classList.remove("hidden");
		});

	document.getElementById("search-input").focus();
};

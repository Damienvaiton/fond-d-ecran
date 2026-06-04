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

// --- Drag & drop raccourcis ---
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

// --- Rendu des raccourcis ---
function renderShortcuts(user) {
	const shortcuts = getShortcuts(user);
	const container = document.getElementById("shortcuts");
	container.innerHTML = "";

	shortcuts.forEach((s, i) => {
		if (s.type === "folder") {
			const item = createFolderItem(s, i, user);
			item.style.animationDelay = `${i * 0.08}s`;
			container.appendChild(item);
		} else {
			const icon = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(s.url).hostname}`;
			const link = document.createElement("a");
			link.className = "shortcut-item";
			link.href = s.url;
			link.draggable = true;
			link.style.animationDelay = `${i * 0.08}s`;
			link.dataset.index = i;

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

			// Clic droit → menu contextuel
			link.addEventListener("contextmenu", (e) => {
				e.preventDefault();
				showContextMenu(e.clientX, e.clientY, i, user);
			});

			container.appendChild(link);
		}
	});

	initDragDrop(container, user);
}

// --- Dossier item ---
function createFolderItem(folder, index, user) {
	const item = document.createElement("div");
	item.className = "shortcut-item folder-item";
	item.draggable = true;
	item.dataset.index = index;

	const removeBtn = document.createElement("button");
	removeBtn.className = "shortcut-remove";
	removeBtn.textContent = "✕";
	removeBtn.title = "Supprimer";
	removeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		const updated = getShortcuts(user).filter((_, idx) => idx !== index);
		saveShortcuts(user, updated);
		renderShortcuts(user);
		closeFolderPopup();
	});

	item.innerHTML = `<div class="icon-wrapper folder-icon-wrapper"><span class="folder-emoji">📁</span></div><span>${folder.name}</span>`;
	item.appendChild(removeBtn);

	// Clic droit → menu contextuel
	item.addEventListener("contextmenu", (e) => {
		e.preventDefault();
		showFolderContextMenu(e.clientX, e.clientY, index, user);
	});

	// Clic → ouvre le popup du dossier
	item.addEventListener("click", (e) => {
		if (e.target === removeBtn) return;
		e.preventDefault();
		toggleFolderPopup(folder, index, item, user);
	});

	return item;
}

// --- Popup dossier ---
let openFolderIndex = null;

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

	if (!folder.links || folder.links.length === 0) {
		const empty = document.createElement("div");
		empty.className = "folder-popup-empty";
		empty.textContent = "Dossier vide — cliquez + pour ajouter";
		popup.appendChild(empty);
	}

	popup.classList.remove("hidden");
	const rect = anchorEl.getBoundingClientRect();
	popup.style.left = `${rect.left + rect.width / 2 - popup.offsetWidth / 2}px`;
	popup.style.top = `${rect.top - popup.offsetHeight - 10}px`;

	requestAnimationFrame(() => {
		popup.style.left = `${rect.left + rect.width / 2 - popup.offsetWidth / 2}px`;
		popup.style.top = `${rect.top - popup.offsetHeight - 10}px`;
	});
}

function closeFolderPopup() {
	const popup = document.getElementById("folder-popup");
	popup.classList.add("hidden");
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

// --- Menu contextuel clic droit ---
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
	const menu = document.getElementById("shortcut-context-menu");
	menu.classList.add("hidden");
	contextTarget = null;
}

function initContextMenu() {
	document.getElementById("ctx-edit").addEventListener("click", () => {
		if (!contextTarget) return;
		const { index, user, isFolder } = contextTarget;
		closeContextMenu();
		if (isFolder) {
			openEditFolder(index, user);
		} else {
			openEditShortcut(index, user);
		}
	});

	document.getElementById("ctx-delete").addEventListener("click", () => {
		if (!contextTarget) return;
		const { index, user } = contextTarget;
		closeContextMenu();
		const updated = getShortcuts(user).filter((_, idx) => idx !== index);
		saveShortcuts(user, updated);
		renderShortcuts(user);
	});

	document.addEventListener("click", (e) => {
		if (!document.getElementById("shortcut-context-menu").contains(e.target)) {
			closeContextMenu();
		}
		if (
			!document.getElementById("folder-popup").contains(e.target) &&
			!e.target.closest(".folder-item")
		) {
			closeFolderPopup();
		}
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeContextMenu();
			closeFolderPopup();
		}
	});
}

// --- Modale édition raccourci ---
function initEditShortcutModal() {
	const modal = document.getElementById("edit-shortcut-modal");
	document
		.getElementById("edit-shortcut-cancel")
		.addEventListener("click", () => {
			modal.classList.add("hidden");
		});
	document
		.getElementById("edit-shortcut-confirm")
		.addEventListener("click", () => {
			saveEditedShortcut();
		});
	[
		document.getElementById("edit-shortcut-name"),
		document.getElementById("edit-shortcut-url"),
	].forEach((input) => {
		input.addEventListener("keydown", (e) => {
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
	document.getElementById("edit-shortcut-name").value = s.name;
	document.getElementById("edit-shortcut-url").value = s.url;
	modal.dataset.index = index;
	modal.dataset.user = user;
	modal.classList.remove("hidden");
	document.getElementById("edit-shortcut-name").focus();
}

function openEditFolder(index, user) {
	const s = getShortcuts(user)[index];
	if (!s) return;
	const modal = document.getElementById("edit-shortcut-modal");
	document.getElementById("edit-shortcut-name").value = s.name;
	document.getElementById("edit-shortcut-url").value = "";
	document.getElementById("edit-shortcut-url").placeholder =
		"(dossier — pas d'URL)";
	document.getElementById("edit-shortcut-url").disabled = true;
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
	modal.classList.add("hidden");
	modal.dataset.isFolder = "";
	document.getElementById("edit-shortcut-url").disabled = false;
	document.getElementById("edit-shortcut-url").placeholder = "URL";
}

// --- Modale création dossier ---
function initFolderModal() {
	const modal = document.getElementById("folder-modal");
	document.getElementById("add-folder-btn").addEventListener("click", () => {
		document.getElementById("folder-name").value = "";
		modal.classList.remove("hidden");
		document.getElementById("folder-name").focus();
	});
	document.getElementById("folder-cancel").addEventListener("click", () => {
		modal.classList.add("hidden");
	});
	document.getElementById("folder-confirm").addEventListener("click", () => {
		createFolder();
	});
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

// --- Theme color navigateur ---
function extractDominantColor(imgSrc, callback) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const img = new Image();
	img.crossOrigin = "anonymous";
	img.onload = () => {
		canvas.width = 50;
		canvas.height = 50;
		ctx.drawImage(img, 0, 0, 50, 50);

		const data = ctx.getImageData(0, 0, 50, 50).data;
		let r = 0,
			g = 0,
			b = 0,
			count = 0;

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
			callback("#1a1a2e");
			return;
		}
		r = Math.round((r / count) * 0.6);
		g = Math.round((g / count) * 0.6);
		b = Math.round((b / count) * 0.6);
		callback(`rgb(${r},${g},${b})`);
	};
	img.onerror = () => {
		console.warn("[theme] extractDominantColor failed for", imgSrc);
		callback("#1a1a2e");
	};
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
	applyClockVisibility(name);
	clearInterval(window._bannerInterval);
	checkTsEvents();
	renderCountdown();
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

// --- Helpers horloge & filtre événements ---
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
function applyClockVisibility(user) {
	const wrapper = document.getElementById("clock-wrapper");
	if (!wrapper) return;
	wrapper.style.display = isClockVisible(user) ? "" : "none";
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

// --- Modale ajout raccourci ---
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

	// BUG FIX: auto-remplissage du nom depuis l'URL
	urlInput.addEventListener("blur", () => {
		if (urlInput.value.trim() && !nameInput.value.trim()) {
			try {
				let url = urlInput.value.trim();
				if (!/^https?:\/\//i.test(url)) url = "https://" + url;
				const hostname = new URL(url).hostname.replace(/^www\./, "");
				const parts = hostname.split(".");
				const domain = parts[0];
				nameInput.value = domain.charAt(0).toUpperCase() + domain.slice(1);
			} catch {}
		}
	});

	document.getElementById("shortcut-confirm").addEventListener("click", () => {
		let name = nameInput.value.trim();
		let url = urlInput.value.trim();
		if (!name || !url) return;
		if (!/^https?:\/\//i.test(url)) url = "https://" + url;

		// Ajout dans dossier ou en raccourci normal
		if (modal.dataset.folderIndex !== undefined) {
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
			// BUG FIX: vérification doublon
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

// --- Modale config ---
function initConfigModal() {
	const modal = document.getElementById("config-modal");

	document.getElementById("config-btn").addEventListener("click", () => {
		document.getElementById("config-profile-name").value =
			getDisplayName(currentUser);

		const clockToggle = document.getElementById("toggle-clock");
		const eventsToggle = document.getElementById("toggle-events-filter");
		if (clockToggle) clockToggle.checked = isClockVisible(currentUser);
		if (eventsToggle) eventsToggle.checked = isEventsFiltered(currentUser);

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

	// Toggle horloge
	document.getElementById("toggle-clock").addEventListener("change", (e) => {
		saveClockVisible(currentUser, e.target.checked);
		applyClockVisibility(currentUser);
	});

	// Toggle filtre événements
	document
		.getElementById("toggle-events-filter")
		.addEventListener("change", (e) => {
			saveEventsFilter(currentUser, e.target.checked);
			clearInterval(window._bannerInterval);
			checkTsEvents();
		});

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
}

// ---------------------------------------------------------------------------
// ÉVÉNEMENTS
// ---------------------------------------------------------------------------
const EventsOut = [
	// Taylor Swift — albums
	{
		month: 10,
		day: 24,
		year: 2006,
		text: "Taylor Swift sortait son premier album Début il y a {n} 🎸",
	},
	{
		month: 11,
		day: 11,
		year: 2008,
		text: "Taylor Swift sortait son album Fearless il y a {n} 🌟",
	},
	{
		month: 10,
		day: 25,
		year: 2010,
		text: "Taylor Swift sortait son album Speak Now il y a {n} 🎤",
	},
	{
		month: 10,
		day: 22,
		year: 2012,
		text: "Taylor Swift sortait son album Red il y a {n} ❤️",
	},
	{
		month: 10,
		day: 27,
		year: 2014,
		text: "Taylor Swift sortait son album 1989 il y a {n} 🏙️",
	},
	{
		month: 11,
		day: 10,
		year: 2017,
		text: "Taylor Swift sortait son album Reputation il y a {n} 🐍",
	},
	{
		month: 8,
		day: 23,
		year: 2019,
		text: "Taylor Swift sortait son album Lover il y a {n} 💖",
	},
	{
		month: 7,
		day: 24,
		year: 2020,
		text: "Taylor Swift sortait son album Folklore il y a {n} 🌲",
	},
	{
		month: 12,
		day: 11,
		year: 2020,
		text: "Taylor Swift sortait son album Evermore il y a {n} 🌨️",
	},
	{
		month: 4,
		day: 9,
		year: 2021,
		text: "Taylor Swift sortait la Taylor's Version de Fearless il y a {n} 🌙",
	},
	{
		month: 11,
		day: 12,
		year: 2021,
		text: "Taylor Swift sortait la Taylor's Version de Red il y a {n} 🍎",
	},
	{
		month: 10,
		day: 22,
		year: 2022,
		text: "Taylor Swift sortait son album Midnights il y a {n} 🌌",
	},
	{
		month: 7,
		day: 7,
		year: 2023,
		text: "Taylor Swift sortait la Taylor's Version de Speak Now il y a {n} 🎤",
	},
	{
		month: 10,
		day: 27,
		year: 2023,
		text: "Taylor Swift sortait la Taylor's Version de 1989 il y a {n} 🏙️",
	},
	{
		month: 4,
		day: 19,
		year: 2024,
		text: "Taylor Swift sortait son album The Tortured Poets Department il y a {n} 🌙",
	},
	{
		month: 10,
		day: 3,
		year: 2025,
		text: "Taylor Swift sortait son album The Life of a Showgirl il y a {n} 🎭",
	},
	// Gracie Abrams
	{
		month: 7,
		day: 14,
		year: 2020,
		text: "Gracie Abrams sortait son premier EP Minor il y a {n} 🌙",
	},
	{
		month: 11,
		day: 12,
		year: 2021,
		text: "Gracie Abrams sortait son deuxième EP This Is What It Feels Like il y a {n} 🌙",
	},
	{
		month: 2,
		day: 24,
		year: 2023,
		text: "Gracie Abrams sortait son premier album Good Riddance il y a {n} 🌙",
	},
	{
		month: 6,
		day: 24,
		year: 2024,
		text: "Gracie Abrams sortait son deuxième album The Secret of Us il y a {n} 🌙",
	},
	{
		month: 7,
		day: 17,
		year: 2026,
		text: "Gracie Abrams sortait son troisième album Daughter from Hell il y a {n} 🌙",
	},
	// Sabrina Carpenter
	{
		month: 4,
		day: 8,
		year: 2014,
		text: "Sabrina Carpenter sortait son premier EP Can't Blame a Girl for Trying il y a {n} 🏆",
	},
	{
		month: 4,
		day: 14,
		year: 2015,
		text: "Sabrina Carpenter sortait son premier album Eyes Wide Open il y a {n} 🏆",
	},
	{
		month: 10,
		day: 14,
		year: 2016,
		text: "Sabrina Carpenter sortait son deuxième album Evolution il y a {n} 🌟",
	},
	{
		month: 11,
		day: 9,
		year: 2018,
		text: "Sabrina Carpenter sortait son troisième album Singular: Act I il y a {n} 🌙",
	},
	{
		month: 7,
		day: 19,
		year: 2019,
		text: "Sabrina Carpenter sortait son quatrième album Singular: Act II il y a {n} 🌙",
	},
	{
		month: 8,
		day: 11,
		year: 2017,
		text: "Sabrina Carpenter sortait son deuxième EP Pandora Sessions il y a {n} 🌟",
	},
	{
		month: 7,
		day: 15,
		year: 2022,
		text: "Sabrina Carpenter sortait son cinquième album Emails I Can't Send il y a {n} 🌙",
	},
	{
		month: 8,
		day: 23,
		year: 2024,
		text: "Sabrina Carpenter sortait son sixième album Short n' Sweet il y a {n} 🌙",
	},
	{
		month: 8,
		day: 29,
		year: 2025,
		text: "Sabrina Carpenter sortait son album Man's Best Friend il y a {n} 🌙",
	},
	{
		month: 11,
		day: 17,
		year: 2023,
		text: "Sabrina Carpenter sortait son troisième EP Fruitcake il y a {n} 🌙",
	},
	// One Direction
	{
		month: 11,
		day: 18,
		year: 2011,
		text: "One Direction sortaient leur premier album Up All Night il y a {n} 🌟",
	},
	{
		month: 11,
		day: 9,
		year: 2012,
		text: "One Direction sortaient leur deuxième album Take Me Home il y a {n} 🌟",
	},
	{
		month: 11,
		day: 25,
		year: 2013,
		text: "One Direction sortaient leur troisième album Midnight Memories il y a {n} 🌟",
	},
	{
		month: 11,
		day: 17,
		year: 2014,
		text: "One Direction sortaient leur quatrième album Four il y a {n} 🌟",
	},
	{
		month: 11,
		day: 13,
		year: 2015,
		text: "One Direction sortaient leur cinquième album Made in the A.M. il y a {n} 🌟",
	},
	{
		month: 9,
		day: 20,
		year: 2012,
		text: "One Direction sortaient leur EP iTunes Festival: London 2012 il y a {n} 🌟",
	},
	{
		month: 9,
		day: 28,
		year: 2012,
		text: "One Direction sortaient leur EP Live While We're Young il y a {n} 🌟",
	},
	// Niall Horan
	{
		month: 10,
		day: 20,
		year: 2017,
		text: "Niall Horan sortait son premier album Flicker il y a {n} 🌟",
	},
	{
		month: 3,
		day: 13,
		year: 2020,
		text: "Niall Horan sortait son deuxième album Heartbreak Weather il y a {n} 🌟",
	},
	{
		month: 6,
		day: 9,
		year: 2023,
		text: "Niall Horan sortait son troisième album The Show il y a {n} 🌟",
	},
	{
		month: 6,
		day: 5,
		year: 2026,
		text: "Niall Horan sort son quatrième album Dinner Party aujourd'hui 🎉",
	},
	{
		month: 4,
		day: 21,
		year: 2018,
		text: "Niall Horan sortait son premier EP Mirrors il y a {n} 🌟",
	},
	// Louis Tomlinson
	{
		month: 1,
		day: 31,
		year: 2020,
		text: "Louis Tomlinson sortait son premier album Walls il y a {n} 🌟",
	},
	{
		month: 11,
		day: 11,
		year: 2022,
		text: "Louis Tomlinson sortait son deuxième album Faith in the Future il y a {n} 🌟",
	},
	{
		month: 1,
		day: 23,
		year: 2026,
		text: "Louis Tomlinson sortait son troisième album How Did I Get Here? il y a {n} 🌟",
	},
	// Harry Styles
	{
		month: 5,
		day: 12,
		year: 2017,
		text: "Harry Styles sortait son premier album il y a {n} 🌟",
	},
	{
		month: 12,
		day: 13,
		year: 2019,
		text: "Harry Styles sortait son deuxième album Fine Line il y a {n} 🌟",
	},
	{
		month: 5,
		day: 20,
		year: 2022,
		text: "Harry Styles sortait son troisième album Harry's House il y a {n} 🌟",
	},
	{
		month: 3,
		day: 6,
		year: 2026,
		text: "Harry Styles sortait son quatrième album Kiss All the Time. Disco, Occasionally. il y a {n} 🌟",
	},
	// Zayn
	{
		month: 3,
		day: 25,
		year: 2016,
		text: "Zayn sortait son premier album Mind of Mine il y a {n} 🌟",
	},
	{
		month: 12,
		day: 14,
		year: 2018,
		text: "Zayn sortait son deuxième album Icarus Falls il y a {n} 🌟",
	},
	{
		month: 1,
		day: 15,
		year: 2021,
		text: "Zayn sortait son troisième album Nobody Is Listening il y a {n} 🌟",
	},
	{
		month: 5,
		day: 17,
		year: 2024,
		text: "Zayn sortait son quatrième album Room Under the Stairs il y a {n} 🌟",
	},
	{
		month: 4,
		day: 17,
		year: 2026,
		text: "Zayn sortait son cinquième album Konnakol il y a {n} 🌟",
	},
	// Liam Payne
	{
		month: 12,
		day: 6,
		year: 2019,
		text: "Liam Payne sortait son premier album LP1 il y a {n} 🌟",
	},
	{
		month: 8,
		day: 24,
		year: 2018,
		text: "Liam Payne sortait son premier EP First Time il y a {n} 🌟",
	},
	{
		month: 10,
		day: 9,
		year: 2020,
		text: "Liam Payne sortait son deuxième EP Midnight Hour il y a {n} 🌟",
	},
];

// Mapping artiste → profils pour le filtre
const artistProfileMap = {
	"Taylor Swift": ["Carotte", "Alex"],
	"Gracie Abrams": ["Carotte", "Alex"],
	"Sabrina Carpenter": ["Carotte", "Alex"],
	"Tate McRae": ["Carotte", "Alex"],
	"One Direction": ["Carotte", "Alex"],
	"Niall Horan": ["Carotte", "Alex"],
	"Harry Styles": ["Carotte", "Alex"],
	"Louis Tomlinson": ["Carotte", "Alex"],
	Zayn: ["Carotte", "Alex"],
	"Liam Payne": ["Carotte", "Alex"],
};

function getEventArtist(event) {
	if (event.artist) return event.artist;
	for (const name of Object.keys(artistProfileMap)) {
		if (event.text.includes(name)) return name;
	}
	return null;
}

function isEventForProfile(event, user) {
	if (!isEventsFiltered(user)) return true;
	const artist = getEventArtist(event);
	if (!artist) return true;
	const allowed = artistProfileMap[artist];
	if (!allowed) return true;
	return allowed.includes(user);
}

function checkTsEvents() {
	const now = new Date();
	const day = now.getDate();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();

	const banner = document.getElementById("ts-event-banner");
	if (!banner) return;

	const matches = EventsOut.filter(
		(e) =>
			e.month === month &&
			e.day === day &&
			e.year <= year &&
			isEventForProfile(e, currentUser),
	).sort((a, b) => b.year - a.year);

	if (matches.length === 0) {
		banner.classList.add("hidden");
		return;
	}

	if (matches.length === 1) {
		const e = matches[0];
		const n = year - e.year;
		const text =
			n === 0
				? e.text.replace(" il y a {n}", " — c'est aujourd'hui ! 🎉")
				: e.text.replace("{n}", `${n} an${n > 1 ? "s" : ""}`);
		banner.innerHTML = `<span>${text}</span>`;
		banner.classList.remove("hidden");
		return;
	}

	// Carrousel pour plusieurs événements
	let currentIdx = 0;

	function renderBannerSlide() {
		const e = matches[currentIdx];
		const n = year - e.year;
		const text =
			n === 0
				? e.text.replace(" il y a {n}", " — c'est aujourd'hui ! 🎉")
				: e.text.replace("{n}", `${n} an${n > 1 ? "s" : ""}`);
		const dots = matches
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
			currentIdx = (currentIdx - 1 + matches.length) % matches.length;
			renderBannerSlide();
		});
		banner.querySelector(".banner-next").addEventListener("click", (e) => {
			e.stopPropagation();
			currentIdx = (currentIdx + 1) % matches.length;
			renderBannerSlide();
		});
	}

	renderBannerSlide();
	banner.classList.remove("hidden");

	clearInterval(window._bannerInterval);
	window._bannerInterval = setInterval(() => {
		currentIdx = (currentIdx + 1) % matches.length;
		renderBannerSlide();
	}, 6000);
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

// --- Helpers ordre artistes ---
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
	const map = {};
	artists.forEach((a) => {
		map[a.name] = a;
	});
	const ordered = order.map((name) => map[name]).filter(Boolean);
	artists.forEach((a) => {
		if (!order.includes(a.name)) ordered.push(a);
	});
	return ordered;
}

// --- Rendu du menu artistes (sidebar) ---
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

	const orderedArtists = getOrderedArtists();
	const categories = {};
	const catOrder = [];
	orderedArtists.forEach((artist) => {
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
			applyArtistPhoto(avatar, artist, false);

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

// --- Rendu de la config artistes avec drag & drop ---
function renderArtistsConfig() {
	const list = document.getElementById("artists-config-list");
	if (!list || !currentUser) return;
	list.innerHTML = "";

	const orderedArtists = getOrderedArtists();
	const categories = {};
	const catOrder = [];
	orderedArtists.forEach((artist) => {
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
		const artistList = categories[cat];
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

			const artistBlock = document.createElement("div");
			artistBlock.className = "artists-config-artist";
			artistBlock.draggable = true;
			artistBlock.dataset.artistName = artist.name;

			const dragHandle = document.createElement("span");
			dragHandle.className = "artists-config-drag-handle";
			dragHandle.textContent = "⠿";
			dragHandle.title = "Réordonner";

			const artistHeader = document.createElement("div");
			artistHeader.className = "artists-config-artist-header";

			const artistInfo = document.createElement("div");
			artistInfo.className = "artists-config-artist-info";

			const initBadge = document.createElement("span");
			initBadge.className = "artists-config-initials";
			initBadge.textContent = artist.initials;
			applyArtistPhoto(initBadge, artist, true);

			const artistName = document.createElement("span");
			artistName.className = "artists-config-name";
			artistName.textContent = artist.name;

			artistInfo.appendChild(dragHandle);
			artistInfo.appendChild(initBadge);
			artistInfo.appendChild(artistName);

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
					allStoreIds.forEach((id) => {
						const idx = disabled.indexOf(id);
						if (idx !== -1) disabled.splice(idx, 1);
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

			artistHeader.appendChild(artistInfo);
			artistHeader.appendChild(masterToggle);
			artistHeader.appendChild(expandBtn);
			artistBlock.appendChild(artistHeader);

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

			// Drag & drop artistes
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
				const rect = artistBlock.getBoundingClientRect();
				const midY = rect.top + rect.height / 2;
				if (e.clientY < midY) {
					list.insertBefore(dragArtist, artistBlock);
				} else {
					artistBlock.after(dragArtist);
				}
			});

			list.appendChild(artistBlock);
		});
	});
}

// ---------------------------------------------------------------------------
// COUNTDOWN prochain événement à venir
// ---------------------------------------------------------------------------
function getNextUpcomingEvent() {
	if (!currentUser) return null;
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	const futureEvents = EventsOut.filter((e) => {
		const evDate = new Date(e.year, e.month - 1, e.day);
		return evDate > today && isEventForProfile(e, currentUser);
	}).sort(
		(a, b) =>
			new Date(a.year, a.month - 1, a.day) -
			new Date(b.year, b.month - 1, b.day),
	);

	if (futureEvents.length) {
		const e = futureEvents[0];
		const evDate = new Date(e.year, e.month - 1, e.day);
		const daysLeft = Math.round((evDate - today) / 86400000);
		let text = e.text
			.replace("{n}", "")
			.replace(/sortait/g, "sort")
			.replace(/sortaient/g, "sortent")
			.replace(/il y a\s*/g, "")
			.replace(/\s{2,}/g, " ")
			.trim();
		return { daysLeft, text, date: evDate };
	}

	for (let d = 1; d <= 366; d++) {
		const checkDate = new Date(today);
		checkDate.setDate(today.getDate() + d);
		const cm = checkDate.getMonth() + 1;
		const cd = checkDate.getDate();
		const cy = checkDate.getFullYear();
		const found = EventsOut.find(
			(e) =>
				e.month === cm &&
				e.day === cd &&
				e.year < cy &&
				isEventForProfile(e, currentUser),
		);
		if (found) {
			const n = cy - found.year;
			return {
				daysLeft: d,
				text: found.text.replace("{n}", `${n} an${n > 1 ? "s" : ""}`),
				date: checkDate,
			};
		}
	}
	return null;
}

function renderCountdown() {
	const existing = document.getElementById("event-countdown");
	if (existing) existing.remove();
	const ev = getNextUpcomingEvent();
	if (!ev) return;

	let label;
	if (ev.daysLeft === 0) label = "Aujourd'hui";
	else if (ev.daysLeft === 1) label = "Demain";
	else label = `J-${ev.daysLeft}`;

	const el = document.createElement("div");
	el.id = "event-countdown";
	el.innerHTML = `
		<div class="cd-days">${label}</div>
		<div class="cd-sep"></div>
		<div class="cd-text">${ev.text.trim()}</div>
	`;

	const clockWrapper = document.getElementById("clock-wrapper");
	if (clockWrapper && clockWrapper.parentNode) {
		clockWrapper.after(el);
	}
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

function applyArtistPhoto(el, artist, isConfigBadge) {
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

	document.getElementById("lens-btn").addEventListener("click", () => {
		resetLens();
		modal.classList.remove("hidden");
	});

	closeBtn.addEventListener("click", closeLens);
	modal.addEventListener("click", (e) => {
		if (e.target === modal) closeLens();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && !modal.classList.contains("hidden")) closeLens();
	});

	dropzone.addEventListener("click", (e) => {
		if (e.target === previewRemove) return;
		if (!preview.classList.contains("hidden")) return;
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
		if (!file || !file.type.startsWith("image/")) return;
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
	let history = getSearchHistory();
	history = history.filter((h) => h.toLowerCase() !== query.toLowerCase());
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
				const h = getSearchHistory().filter((_, idx) => idx !== i);
				saveSearchHistory(h);
				renderDropdown(input.value);
			});

			item.appendChild(icon);
			item.appendChild(text);
			item.appendChild(del);

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

	input.addEventListener("focus", () => {
		renderDropdown(input.value);
	});

	input.addEventListener("input", () => {
		renderDropdown(input.value);
	});

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

	form.addEventListener("submit", () => {
		addToSearchHistory(input.value);
	});
}

// --- Init ---
window.onload = () => {
	initUserSelector();
	initShortcutModal();
	initConfigModal();
	initLensModal();
	initContextMenu();
	initEditShortcutModal();
	initFolderModal();

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

	document
		.getElementById("switch-profile-btn")
		.addEventListener("click", () => {
			initUserSelector();
			document.getElementById("user-selector").classList.remove("hidden");
		});

	document.getElementById("search-input").focus();
};

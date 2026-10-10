// ---------------------------------------------------------------------------
// Grille des raccourcis : rendu, glisser-déposer, popup des dossiers et menu
// contextuel (clic droit).
// ---------------------------------------------------------------------------

import { $, h, placeInViewport } from "../../core/dom.js";
import { emit, getUser, on } from "../../core/state.js";
import { faviconUrl } from "../../core/url.js";
import { openAddLink, openEditItem } from "./dialogs.js";
import { getShortcuts, isFolder, moveItem, removeItem, removeLink } from "./store.js";

let grid;
let popup;
let menu;
let openFolderIndex = null;
let menuTargetIndex = null;

export function initShortcutsView() {
	grid = $("#shortcuts");
	popup = $("#folder-popup");
	menu = $("#shortcut-context-menu");

	initDragAndDrop();
	initContextMenu();

	document.addEventListener("click", (e) => {
		if (!popup.contains(e.target) && !e.target.closest(".folder-item")) closeFolder();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeMenu();
			closeFolder();
		}
	});

	on("profile", () => {
		closeFolder();
		render();
	});
	// payload optionnel : { folder: index } pour (ré)ouvrir un dossier après rendu
	on("shortcuts", (payload) => {
		render();
		if (payload?.folder !== undefined) openFolder(payload.folder);
		else closeFolder(); // les index ont pu changer
	});
}

function changed(payload) {
	emit("shortcuts", payload);
}

// --- Rendu ------------------------------------------------------------------

function render() {
	const user = getUser();
	const items = user ? getShortcuts(user) : [];
	grid.replaceChildren(
		...items.map((item, index) => {
			const el = isFolder(item) ? folderTile(item, index) : linkTile(item, index);
			el.style.animationDelay = `${index * 0.08}s`;
			return el;
		}),
	);
}

function removeButton(onRemove) {
	return h("button", {
		className: "shortcut-remove",
		type: "button",
		text: "✕",
		title: "Supprimer",
		attrs: { "aria-label": "Supprimer" },
		on: {
			click: (e) => {
				e.preventDefault();
				e.stopPropagation();
				onRemove();
			},
		},
	});
}

function linkTile(shortcut, index) {
	const icon = faviconUrl(shortcut.url);
	return h(
		"a",
		{
			className: "shortcut-item",
			href: shortcut.url,
			draggable: true,
			dataset: { index },
			on: { contextmenu: (e) => openMenu(e, index) },
		},
		h(
			"div",
			{ className: "shortcut-icon" },
			icon ? h("img", { src: icon, alt: "" }) : h("span", { text: "🔗" }),
		),
		h("span", { className: "shortcut-label", text: shortcut.name }),
		removeButton(() => {
			removeItem(getUser(), index);
			changed();
		}),
	);
}

function folderTile(folder, index) {
	return h(
		"div",
		{
			className: "shortcut-item folder-item",
			draggable: true,
			dataset: { index },
			attrs: { role: "button", tabindex: 0 },
			on: {
				click: (e) => {
					e.preventDefault();
					openFolderIndex === index ? closeFolder() : openFolder(index);
				},
				keydown: (e) => {
					if (e.key === "Enter") openFolder(index);
				},
				contextmenu: (e) => openMenu(e, index),
			},
		},
		h("div", { className: "shortcut-icon" }, h("span", { className: "folder-emoji", text: "📁" })),
		h("span", { className: "shortcut-label", text: folder.name }),
		removeButton(() => {
			if (openFolderIndex === index) closeFolder();
			removeItem(getUser(), index);
			changed();
		}),
	);
}

// --- Glisser-déposer ----------------------------------------------------------
// Écouteurs posés une seule fois sur le conteneur (délégation) : seuls ses
// enfants sont recréés à chaque rendu.

function initDragAndDrop() {
	let dragged = null;
	const clearMarks = () =>
		grid.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));

	grid.addEventListener("dragstart", (e) => {
		dragged = e.target.closest(".shortcut-item");
		if (!dragged) return;
		closeFolder();
		dragged.classList.add("dragging");
		e.dataTransfer.effectAllowed = "move";
	});
	grid.addEventListener("dragend", () => {
		dragged?.classList.remove("dragging");
		clearMarks();
		dragged = null;
	});
	grid.addEventListener("dragover", (e) => {
		const target = e.target.closest(".shortcut-item");
		if (!dragged || !target) return;
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		if (target === dragged) return;
		clearMarks();
		target.classList.add("drag-over");
	});
	grid.addEventListener("drop", (e) => {
		const target = e.target.closest(".shortcut-item");
		if (!dragged || !target || target === dragged) return;
		e.preventDefault();
		moveItem(getUser(), Number(dragged.dataset.index), Number(target.dataset.index));
		changed();
	});
}

// --- Popup dossier ------------------------------------------------------------

function openFolder(index) {
	const folder = getShortcuts(getUser())[index];
	const anchor = grid.querySelector(`.folder-item[data-index="${index}"]`);
	if (!isFolder(folder) || !anchor) {
		closeFolder();
		return;
	}
	openFolderIndex = index;

	const links = folder.links ?? [];
	popup.replaceChildren(
		h(
			"div",
			{ className: "folder-popup-header" },
			h("span", { className: "folder-popup-title", text: `📁 ${folder.name}` }),
			h("button", {
				className: "folder-popup-add",
				type: "button",
				text: "+",
				title: "Ajouter un lien",
				on: {
					click: (e) => {
						e.stopPropagation();
						openAddLink(index);
					},
				},
			}),
		),
		...links.map((link, linkIndex) =>
			h(
				"a",
				{ className: "folder-popup-link", href: link.url },
				h("img", { className: "folder-link-icon", src: faviconUrl(link.url), alt: "" }),
				h("span", { text: link.name }),
				h("button", {
					className: "folder-link-remove",
					type: "button",
					text: "✕",
					title: "Retirer du dossier",
					on: {
						click: (e) => {
							e.preventDefault();
							e.stopPropagation();
							removeLink(getUser(), index, linkIndex);
							changed({ folder: index });
						},
					},
				}),
			),
		),
		links.length
			? null
			: h("div", {
					className: "folder-popup-empty",
					text: "Dossier vide — cliquez + pour ajouter",
				}),
	);

	popup.classList.remove("hidden");
	requestAnimationFrame(() => {
		const rect = anchor.getBoundingClientRect();
		const left = rect.left + rect.width / 2 - popup.offsetWidth / 2;
		popup.style.left = `${Math.max(8, Math.min(left, window.innerWidth - popup.offsetWidth - 8))}px`;
		popup.style.top = `${Math.max(8, rect.top - popup.offsetHeight - 10)}px`;
	});
}

function closeFolder() {
	popup.classList.add("hidden");
	openFolderIndex = null;
}

// --- Menu contextuel ----------------------------------------------------------

function initContextMenu() {
	$("#ctx-edit").addEventListener("click", () => {
		const index = menuTargetIndex;
		closeMenu();
		if (index !== null) openEditItem(index);
	});
	$("#ctx-delete").addEventListener("click", () => {
		const index = menuTargetIndex;
		closeMenu();
		if (index === null) return;
		if (openFolderIndex === index) closeFolder();
		removeItem(getUser(), index);
		changed();
	});
	document.addEventListener("click", (e) => {
		if (!menu.contains(e.target)) closeMenu();
	});
}

function openMenu(e, index) {
	e.preventDefault();
	menuTargetIndex = index;
	menu.classList.remove("hidden");
	placeInViewport(menu, e.clientX, e.clientY);
}

function closeMenu() {
	menu.classList.add("hidden");
	menuTargetIndex = null;
}

// ---------------------------------------------------------------------------
// Modales des raccourcis : ajout (raccourci ou lien de dossier), modification,
// création de dossier.
// ---------------------------------------------------------------------------

import { $, flashError } from "../../core/dom.js";
import { createModal, onEnter } from "../../core/modal.js";
import { emit, getUser } from "../../core/state.js";
import { isHttpUrl, nameFromUrl, normalizeUrl } from "../../core/url.js";
import { addFolder, addLink, addShortcut, getShortcuts, isFolder, updateItem } from "./store.js";

let addModal;
let editModal;
let folderModal;
let addTargetFolder = null; // index du dossier visé, ou null pour la grille
let editIndex = null;

export function initShortcutDialogs() {
	initAddDialog();
	initEditDialog();
	initFolderDialog();
}

/** Lit et valide une paire nom/URL ; signale les champs invalides. */
function readLinkFields(nameInput, urlInput) {
	const name = nameInput.value.trim();
	const url = normalizeUrl(urlInput.value);
	if (!name) flashError(nameInput);
	if (!isHttpUrl(url)) flashError(urlInput);
	return name && isHttpUrl(url) ? { name, url } : null;
}

// --- Ajout ------------------------------------------------------------------

/** Ouvre la modale d'ajout : dans la grille (null) ou dans un dossier. */
export function openAddLink(folderIndex = null) {
	addTargetFolder = folderIndex;
	$("#shortcut-modal-title").textContent =
		folderIndex === null ? "Ajouter un raccourci" : "Ajouter au dossier";
	$("#shortcut-name").value = "";
	$("#shortcut-url").value = "";
	$("#shortcut-url").title = "";
	addModal.open();
}

function initAddDialog() {
	addModal = createModal("shortcut-modal");
	const nameInput = $("#shortcut-name");
	const urlInput = $("#shortcut-url");

	$("#add-shortcut-btn").addEventListener("click", () => openAddLink(null));

	// Propose un nom à partir de l'URL si le champ nom est vide
	urlInput.addEventListener("blur", () => {
		if (urlInput.value.trim() && !nameInput.value.trim())
			nameInput.value = nameFromUrl(urlInput.value);
	});

	const confirm = () => {
		const link = readLinkFields(nameInput, urlInput);
		if (!link) return;
		const user = getUser();
		if (addTargetFolder !== null) {
			addLink(user, addTargetFolder, link);
			addModal.close();
			emit("shortcuts", { folder: addTargetFolder });
			return;
		}
		if (!addShortcut(user, link)) {
			flashError(urlInput, 2000);
			urlInput.title = "Ce raccourci existe déjà";
			return;
		}
		addModal.close();
		emit("shortcuts");
	};
	$("#shortcut-confirm").addEventListener("click", confirm);
	onEnter([nameInput, urlInput], confirm);
}

// --- Modification -------------------------------------------------------------

function initEditDialog() {
	editModal = createModal("edit-shortcut-modal");
	const nameInput = $("#edit-shortcut-name");
	const urlInput = $("#edit-shortcut-url");

	const confirm = () => {
		const user = getUser();
		const item = getShortcuts(user)[editIndex];
		if (!item) return editModal.close();
		if (isFolder(item)) {
			const name = nameInput.value.trim();
			if (!name) return flashError(nameInput);
			updateItem(user, editIndex, { name });
		} else {
			const link = readLinkFields(nameInput, urlInput);
			if (!link) return;
			updateItem(user, editIndex, link);
		}
		editModal.close();
		emit("shortcuts");
	};
	$("#edit-shortcut-confirm").addEventListener("click", confirm);
	onEnter([nameInput, urlInput], confirm);
}

export function openEditItem(index) {
	const item = getShortcuts(getUser())[index];
	if (!item) return;
	editIndex = index;
	const folder = isFolder(item);
	$("#edit-shortcut-title").textContent = folder ? "Renommer le dossier" : "Modifier le raccourci";
	$("#edit-shortcut-name").value = item.name;
	const urlInput = $("#edit-shortcut-url");
	urlInput.value = folder ? "" : item.url;
	urlInput.classList.toggle("hidden", folder);
	editModal.open();
}

// --- Dossier ------------------------------------------------------------------

function initFolderDialog() {
	folderModal = createModal("folder-modal");
	const nameInput = $("#folder-name");

	$("#add-folder-btn").addEventListener("click", () => {
		nameInput.value = "";
		folderModal.open();
	});

	const confirm = () => {
		const name = nameInput.value.trim();
		if (!name) return flashError(nameInput);
		addFolder(getUser(), name);
		folderModal.close();
		emit("shortcuts");
	};
	$("#folder-confirm").addEventListener("click", confirm);
	onEnter([nameInput], confirm);
}

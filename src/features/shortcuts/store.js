// ---------------------------------------------------------------------------
// Raccourcis d'un profil : liens { name, url } et dossiers
// { type: "folder", name, links: [{ name, url }] }.
// ---------------------------------------------------------------------------

import { KEYS, readJSON, writeJSON } from "../../core/storage.js";

export const isFolder = (item) => item?.type === "folder";

export function getShortcuts(user) {
	const list = readJSON(KEYS.shortcuts(user), []);
	return Array.isArray(list) ? list : [];
}

function update(user, mutate) {
	const list = getShortcuts(user);
	mutate(list);
	writeJSON(KEYS.shortcuts(user), list);
	return list;
}

/** Retourne false si un raccourci vers cette URL existe déjà. */
export function addShortcut(user, { name, url }) {
	if (getShortcuts(user).some((s) => !isFolder(s) && s.url === url)) return false;
	update(user, (list) => list.push({ name, url }));
	return true;
}

export function addFolder(user, name) {
	update(user, (list) => list.push({ type: "folder", name, links: [] }));
}

export function updateItem(user, index, patch) {
	update(user, (list) => {
		if (list[index]) Object.assign(list[index], patch);
	});
}

export function removeItem(user, index) {
	update(user, (list) => list.splice(index, 1));
}

export function moveItem(user, from, to) {
	update(user, (list) => {
		if (from === to || !list[from] || !list[to]) return;
		list.splice(to, 0, ...list.splice(from, 1));
	});
}

export function addLink(user, folderIndex, link) {
	update(user, (list) => {
		const folder = list[folderIndex];
		if (isFolder(folder)) (folder.links ??= []).push(link);
	});
}

export function removeLink(user, folderIndex, linkIndex) {
	update(user, (list) => list[folderIndex]?.links?.splice(linkIndex, 1));
}

// ---------------------------------------------------------------------------
// Recherche par image (Google Lens) : fichier importé/déposé ou lien d'image.
// ---------------------------------------------------------------------------

import { $, flashError, h } from "../core/dom.js";
import { createModal, onEnter } from "../core/modal.js";
import { isHttpUrl, normalizeUrl } from "../core/url.js";

let modal;
let pendingFile = null;

export function initLens() {
	modal = createModal("lens-modal", { onClose: reset });
	const dropzone = $("#lens-dropzone");
	const fileInput = $("#lens-file-input");
	const urlInput = $("#lens-url-input");

	$("#lens-btn").addEventListener("click", () => {
		reset();
		modal.open();
	});

	dropzone.addEventListener("click", (e) => {
		if (!pendingFile && !e.target.closest("#lens-preview-remove")) fileInput.click();
	});
	dropzone.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") fileInput.click();
	});
	fileInput.addEventListener("change", () => selectFile(fileInput.files[0]));

	dropzone.addEventListener("dragover", (e) => {
		e.preventDefault();
		dropzone.classList.add("drag-active");
	});
	for (const type of ["dragleave", "dragend"])
		dropzone.addEventListener(type, () => dropzone.classList.remove("drag-active"));
	dropzone.addEventListener("drop", (e) => {
		e.preventDefault();
		dropzone.classList.remove("drag-active");
		selectFile(e.dataTransfer.files[0]);
	});

	$("#lens-preview-remove").addEventListener("click", (e) => {
		e.stopPropagation();
		reset();
	});

	$("#lens-search-btn").addEventListener("click", search);
	onEnter([urlInput], search);
}

function selectFile(file) {
	if (!file?.type.startsWith("image/")) return;
	pendingFile = file;
	$("#lens-url-input").value = "";
	$("#lens-preview-img").src = URL.createObjectURL(file);
	$("#lens-drop-inner").classList.add("hidden");
	$("#lens-preview").classList.remove("hidden");
}

function reset() {
	pendingFile = null;
	$("#lens-file-input").value = "";
	$("#lens-url-input").value = "";
	const preview = $("#lens-preview-img");
	if (preview.src.startsWith("blob:")) URL.revokeObjectURL(preview.src);
	preview.removeAttribute("src");
	$("#lens-preview").classList.add("hidden");
	$("#lens-drop-inner").classList.remove("hidden");
}

function search() {
	if (pendingFile) {
		// Lens n'accepte l'envoi de fichier qu'en POST multipart : on soumet
		// un formulaire temporaire vers un nouvel onglet.
		const fileField = h("input", { type: "file", name: "encoded_image" });
		const transfer = new DataTransfer();
		transfer.items.add(pendingFile);
		fileField.files = transfer.files;
		const form = h(
			"form",
			{
				method: "POST",
				action: "https://lens.google.com/upload",
				enctype: "multipart/form-data",
				target: "_blank",
				className: "hidden",
			},
			fileField,
		);
		document.body.append(form);
		form.submit();
		form.remove();
		modal.close();
		return;
	}

	const urlInput = $("#lens-url-input");
	const url = normalizeUrl(urlInput.value);
	if (!isHttpUrl(url)) return flashError(urlInput);
	window.open(
		`https://lens.google.com/uploadbyurl?url=${encodeURIComponent(url)}`,
		"_blank",
		"noopener",
	);
	modal.close();
}

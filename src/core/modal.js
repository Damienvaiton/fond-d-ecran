// ---------------------------------------------------------------------------
// Modales : ouverture/fermeture, clic sur le fond et touche Échap.
// ---------------------------------------------------------------------------

const openStack = [];

document.addEventListener("keydown", (e) => {
	if (e.key !== "Escape" || !openStack.length) return;
	const top = openStack.at(-1);
	if (top.dismissible()) {
		e.preventDefault();
		top.close();
	}
});

/**
 * @param {string} id  id de l'élément .modal dans index.html
 * @param {object} [options]
 * @param {() => boolean} [options.dismissible]  fermeture par Échap / clic sur le fond
 * @param {() => void} [options.onClose]
 */
export function createModal(id, { dismissible = () => true, onClose } = {}) {
	const el = document.getElementById(id);

	const modal = {
		el,
		dismissible,
		isOpen: () => !el.classList.contains("hidden"),
		open() {
			if (!modal.isOpen()) {
				el.classList.remove("hidden");
				openStack.push(modal);
			}
			el.querySelector("[autofocus], input:not([disabled])")?.focus();
		},
		close() {
			if (!modal.isOpen()) return;
			el.classList.add("hidden");
			openStack.splice(openStack.indexOf(modal), 1);
			onClose?.();
		},
	};

	el.addEventListener("mousedown", (e) => {
		if (e.target === el && dismissible()) modal.close();
	});
	for (const btn of el.querySelectorAll("[data-close]"))
		btn.addEventListener("click", () => modal.close());

	return modal;
}

/** Appelle `handler` quand on appuie sur Entrée dans l'un des champs. */
export function onEnter(inputs, handler) {
	for (const input of inputs) {
		input.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				handler();
			}
		});
	}
}

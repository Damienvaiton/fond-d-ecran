// ---------------------------------------------------------------------------
// Petits utilitaires DOM
// ---------------------------------------------------------------------------

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/**
 * Crée un élément : h("button", { className: "x", text: "OK", on: { click } }, ...enfants)
 * Les enfants peuvent être des nœuds, des chaînes (insérées en texte) ou null.
 */
export function h(tag, props = {}, ...children) {
	const el = document.createElement(tag);
	const { className, text, html, dataset, attrs, on, ...rest } = props;
	if (className) el.className = className;
	if (text !== undefined) el.textContent = text;
	if (html !== undefined) el.innerHTML = html;
	if (dataset) Object.assign(el.dataset, dataset);
	if (attrs) {
		for (const [name, value] of Object.entries(attrs)) {
			if (value !== undefined && value !== null && value !== false)
				el.setAttribute(name, value === true ? "" : value);
		}
	}
	if (on) {
		for (const [type, handler] of Object.entries(on)) el.addEventListener(type, handler);
	}
	Object.assign(el, rest); // propriétés DOM directes : type, value, href, title…
	for (const child of children.flat()) {
		if (child === null || child === undefined || child === false) continue;
		el.append(child instanceof Node ? child : document.createTextNode(child));
	}
	return el;
}

/** Signale visuellement un champ invalide pendant un court instant. */
export function flashError(el, duration = 1500) {
	if (!el) return;
	el.classList.add("error");
	setTimeout(() => el.classList.remove("error"), duration);
}

/** Positionne un élément `position: fixed` en (x, y) sans déborder de l'écran. */
export function placeInViewport(el, x, y) {
	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
	requestAnimationFrame(() => {
		const rect = el.getBoundingClientRect();
		if (rect.right > window.innerWidth) el.style.left = `${Math.max(8, x - rect.width)}px`;
		if (rect.bottom > window.innerHeight) el.style.top = `${Math.max(8, y - rect.height)}px`;
	});
}

/** Déclenche le téléchargement d'un fichier généré côté client. */
export function downloadFile(filename, content, type = "application/json") {
	const url = URL.createObjectURL(new Blob([content], { type }));
	const link = h("a", { href: url, download: filename });
	document.body.append(link);
	link.click();
	link.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

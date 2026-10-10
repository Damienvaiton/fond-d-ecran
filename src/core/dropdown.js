// ---------------------------------------------------------------------------
// Liste déroulante stylée (remplace le <select> natif, illisible sur fond sombre).
// ---------------------------------------------------------------------------

import { h } from "./dom.js";

const openDropdowns = new Set();

document.addEventListener("click", () => {
	for (const dropdown of openDropdowns) dropdown.close();
});

/**
 * @param {object} config
 * @param {{ value: any, label: string, className?: string, action?: boolean }[]} config.options
 *        `action: true` : entrée de type commande (« + Nouvel artiste »), jamais sélectionnée
 * @param {string} config.placeholder  texte affiché tant que rien n'est choisi
 * @param {(value: any) => void} [config.onSelect]
 * @param {"down" | "up"} [config.direction]  sens d'ouverture de la liste
 */
export function createDropdown({ options, placeholder, onSelect, direction = "down" }) {
	let value = null;

	const label = h("span", { className: "dropdown-label", text: placeholder });
	const trigger = h(
		"button",
		{ className: "dropdown-trigger", type: "button" },
		label,
		h("span", { className: "dropdown-arrow", text: "▾", attrs: { "aria-hidden": true } }),
	);
	const list = h("div", { className: "dropdown-list", attrs: { role: "listbox" } });
	const el = h("div", { className: `dropdown dropdown--${direction}` }, trigger, list);

	const dropdown = {
		el,
		trigger,
		get value() {
			return value;
		},
		open() {
			for (const other of openDropdowns) other.close();
			el.classList.add("open");
			openDropdowns.add(dropdown);
		},
		close() {
			el.classList.remove("open");
			openDropdowns.delete(dropdown);
		},
		/** Sélectionne une valeur sans déclencher onSelect. */
		setValue(newValue) {
			value = newValue;
			const option = options.find((o) => o.value === newValue);
			label.textContent = option ? option.label : placeholder;
			for (const optEl of list.children)
				optEl.classList.toggle("selected", optEl.dataset.key === String(newValue));
		},
		setOptions(newOptions) {
			options = newOptions;
			list.replaceChildren(
				...options.map((option) =>
					h("div", {
						className: `dropdown-option ${option.className ?? ""}`.trim(),
						text: option.label,
						dataset: { key: String(option.value) },
						attrs: { role: "option" },
						on: {
							mousedown: (e) => {
								e.preventDefault();
								dropdown.close();
								if (!option.action) dropdown.setValue(option.value);
								onSelect?.(option.value);
							},
						},
					}),
				),
			);
			dropdown.setValue(value);
		},
	};

	trigger.addEventListener("click", (e) => {
		e.stopPropagation();
		el.classList.contains("open") ? dropdown.close() : dropdown.open();
	});

	dropdown.setOptions(options);
	return dropdown;
}

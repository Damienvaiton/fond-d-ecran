import { setStorageBackend } from "../src/core/storage.js";

/** Stockage en mémoire compatible avec l'API localStorage. */
export class MemoryStorage {
	#data = new Map();
	get length() {
		return this.#data.size;
	}
	key(i) {
		return [...this.#data.keys()][i] ?? null;
	}
	getItem(key) {
		return this.#data.has(key) ? this.#data.get(key) : null;
	}
	setItem(key, value) {
		this.#data.set(key, String(value));
	}
	removeItem(key) {
		this.#data.delete(key);
	}
	keys() {
		return [...this.#data.keys()];
	}
}

/** Installe un stockage vierge et le retourne. */
export function freshStorage(initial = {}) {
	const storage = new MemoryStorage();
	for (const [key, value] of Object.entries(initial))
		storage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
	setStorageBackend(storage);
	return storage;
}

export const json = (storage, key) => JSON.parse(storage.getItem(key));

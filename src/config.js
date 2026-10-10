// ---------------------------------------------------------------------------
// Configuration statique : profils et artistes livrés avec l'extension.
// Les personnalisations de l'utilisateur (artistes/stores ajoutés, masqués,
// réordonnés…) sont stockées à part et appliquées par-dessus ces valeurs :
// toute modification faite ici est donc bien répercutée chez tout le monde.
// ---------------------------------------------------------------------------

/**
 * Profils disponibles. `hiddenBackgrounds` liste les fonds (dans
 * assets/backgrounds) à ne jamais afficher pour ce profil.
 */
export const PROFILES = {
	Carotte: {
		hiddenBackgrounds: ["50.webp", "53.webp", "54.webp", "58.webp"],
	},
	Alex: {
		hiddenBackgrounds: ["51.webp"],
	},
};

export const PROFILE_NAMES = Object.keys(PROFILES);

export const ARTIST_CATEGORIES = {
	store: "Stores artistes",
	autres: "Autres",
};

/** Drapeaux disponibles dans assets/flags. */
export const FLAGS = ["web", "fr", "eu", "us", "uk", "de", "dk"];

/**
 * Artistes et boutiques par défaut. Chaque store a un `id` stable : c'est lui
 * qui sert de clé pour les préférences (store désactivé, supprimé…).
 * `group: true` : simple regroupement de boutiques (pas un artiste), exclu de
 * la liste des artistes proposés pour les événements.
 */
export const DEFAULT_ARTISTS = [
	{
		name: "Taylor Swift",
		initials: "TS",
		category: "store",
		profiles: ["Carotte", "Alex"],
		stores: [
			{ id: "ts_web", label: "Site officiel", flag: "web", url: "https://taylorswift.com" },
			{ id: "ts_fr", label: "Store France", flag: "fr", url: "https://taylorswift-store.fr" },
			{ id: "ts_eu", label: "Store Europe", flag: "eu", url: "https://store.taylorswifteu.com" },
			{ id: "ts_us", label: "Store US", flag: "us", url: "https://store.taylorswift.com" },
			{ id: "ts_uk", label: "Store UK", flag: "uk", url: "https://taylorswift-store.co.uk" },
		],
	},
	{
		name: "Gracie Abrams",
		initials: "GA",
		category: "store",
		profiles: ["Carotte", "Alex"],
		stores: [
			{ id: "ga_fr", label: "Store France", flag: "fr", url: "https://gracieabrams-store.fr" },
			{ id: "ga_eu", label: "Store Europe", flag: "eu", url: "https://shop.gracieabrams.eu" },
			{
				id: "ga_de",
				label: "Store Allemagne",
				flag: "de",
				url: "https://gracieabrams.universal-music.de/en",
			},
			{ id: "ga_uk", label: "Store UK", flag: "uk", url: "https://shopuk.gracieabrams.com" },
			{ id: "ga_us", label: "Store US", flag: "us", url: "https://shop.gracieabrams.com" },
		],
	},
	{
		name: "Tate McRae",
		initials: "TM",
		category: "store",
		profiles: ["Carotte", "Alex"],
		stores: [
			{ id: "tm_eu", label: "Store Europe", flag: "eu", url: "https://tatemcraeeu.store/" },
			{ id: "tm_uk", label: "Store UK", flag: "uk", url: "https://tatemcraeuk.store/" },
			{ id: "tm_us", label: "Store US", flag: "us", url: "https://tatemcrae.store/" },
		],
	},
	{
		name: "Sabrina Carpenter",
		initials: "SC",
		category: "store",
		profiles: ["Carotte", "Alex"],
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
			{ id: "sc_uk", label: "Store UK", flag: "uk", url: "https://shopuk.sabrinacarpenter.com/" },
			{ id: "sc_us", label: "Store US", flag: "us", url: "https://store.sabrinacarpenter.com/" },
		],
	},
	{
		name: "Disquaires",
		initials: "D",
		category: "store",
		group: true,
		profiles: ["Carotte", "Alex"],
		stores: [{ id: "iMusic_fr", label: "iMusic France", flag: "fr", url: "https://www.imusic.fr" }],
	},
	{
		name: "Autres",
		initials: "A",
		category: "autres",
		group: true,
		profiles: ["Carotte", "Alex"],
		stores: [
			{ id: "bw", label: "Bad World", flag: "uk", url: "https://bad-world.co.uk/" },
			{ id: "br", label: "Blood Records", flag: "uk", url: "https://blood-records.co.uk/" },
		],
	},
];

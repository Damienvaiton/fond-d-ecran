import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	anniversariesOn,
	anniversarySoonText,
	anniversaryText,
	describeRelease,
	filterForProfile,
	flattenGroup,
	mergeGroups,
	nextRelease,
	releasesOn,
	upcomingAnniversaries,
	upcomingReleaseText,
} from "../src/features/events/model.js";

const release = (name, day, month, year, extra = {}) => ({
	name,
	type: "album",
	label: null,
	release_date: { day, month, year },
	...extra,
});

const taylor = {
	artist: "Taylor Swift",
	profiles: ["Carotte", "Alex"],
	discography: [
		release("Fearless", 11, 11, 2008),
		release("Taylor Swift", 24, 10, 2006),
		release("Fearless", 9, 4, 2021, { label: "Taylor's Version" }),
		release("Speak Now", 25, 10, 2010),
		release("The Tortured Poets Department", 19, 4, 2024),
	],
};

describe("flattenGroup", () => {
	const events = flattenGroup(taylor);
	const byName = (name, label = null) =>
		events.find((e) => e.release === name && e.label === label);

	it("numérote les albums dans l'ordre chronologique", () => {
		assert.equal(byName("Taylor Swift").rank, 1);
		assert.equal(byName("Fearless").rank, 2);
		assert.equal(byName("Speak Now").rank, 3);
		assert.equal(byName("The Tortured Poets Department").rank, 4);
	});

	it("ne compte pas les rééditions", () => {
		assert.equal(byName("Fearless", "Taylor's Version").rank, null);
	});

	it("compte les EP séparément des albums", () => {
		const events = flattenGroup({
			artist: "Gracie Abrams",
			discography: [
				release("minor", 13, 7, 2020, { type: "EP" }),
				release("Good Riddance", 24, 2, 2023),
				release("This Is What It Feels Like", 12, 11, 2021, { type: "EP" }),
			],
		});
		const rank = (name) => events.find((e) => e.release === name).rank;
		assert.equal(rank("minor"), 1);
		assert.equal(rank("This Is What It Feels Like"), 2);
		assert.equal(rank("Good Riddance"), 1);
	});
});

describe("textes", () => {
	const [first] = flattenGroup(taylor);
	const reissue = flattenGroup(taylor).find((e) => e.label);

	it("décrit une sortie", () => {
		assert.equal(describeRelease(first), "son premier album Taylor Swift");
		assert.equal(describeRelease(reissue), "la Taylor's Version de Fearless");
	});

	it("accorde « an » au singulier et au pluriel", () => {
		assert.equal(
			anniversaryText(reissue, new Date(2022, 3, 9)),
			"Taylor Swift sortait la Taylor's Version de Fearless il y a 1 an 🎵",
		);
		assert.match(anniversaryText(first, new Date(2026, 9, 24)), /il y a 20 ans 🎵$/);
	});

	it("annonce un anniversaire à venir et une sortie future", () => {
		assert.equal(
			anniversarySoonText(first, new Date(2026, 9, 24)),
			"Taylor Swift · 20 ans de Taylor Swift 🎂",
		);
		assert.equal(upcomingReleaseText(first), "Taylor Swift sort son premier album Taylor Swift 🎵");
	});
});

describe("mergeGroups", () => {
	it("ajoute les sorties sans doublon ni mutation", () => {
		const base = [{ artist: "A", profiles: ["Alex"], discography: [release("X", 1, 1, 2020)] }];
		const custom = [
			{
				artist: "A",
				profiles: ["Carotte"],
				discography: [release("X", 1, 1, 2020), release("X", 1, 1, 2020, { label: "Deluxe" })],
			},
			{ artist: "B", profiles: ["Carotte"], discography: [release("Y", 2, 2, 2021)] },
		];
		const merged = mergeGroups(base, custom);
		assert.equal(merged.length, 2);
		assert.equal(merged[0].discography.length, 2); // la Deluxe n'est pas un doublon
		assert.deepEqual(merged[0].profiles, ["Alex"]); // les profils de la base priment
		assert.equal(base[0].discography.length, 1);
	});
});

describe("requêtes par date", () => {
	const events = flattenGroup({
		artist: "A",
		profiles: ["Alex"],
		discography: [
			release("Bissextile", 29, 2, 2020),
			release("Ancien", 10, 10, 2016),
			release("Récent", 10, 10, 2020),
			release("Aujourd'hui", 10, 10, 2026),
			release("Futur", 1, 12, 2026),
			release("Plus tard", 1, 1, 2027),
		],
	});
	const today = new Date(2026, 9, 10);
	const names = (list) => list.map((x) => (x.event ?? x).release);

	it("sépare sortie du jour et anniversaires (plus récents d'abord)", () => {
		assert.deepEqual(names(releasesOn(events, today)), ["Aujourd'hui"]);
		assert.deepEqual(names(anniversariesOn(events, today)), ["Récent", "Ancien"]);
	});

	it("fête le 29 février le 28 les années non bissextiles", () => {
		assert.deepEqual(names(anniversariesOn(events, new Date(2026, 1, 28))), ["Bissextile"]);
		assert.deepEqual(names(anniversariesOn(events, new Date(2024, 1, 28))), []);
		assert.deepEqual(names(anniversariesOn(events, new Date(2024, 1, 29))), ["Bissextile"]);
	});

	it("liste les anniversaires des prochains jours", () => {
		const upcoming = upcomingAnniversaries(events, new Date(2026, 9, 8), 3);
		assert.deepEqual(names(upcoming), ["Récent", "Ancien"]);
		assert.equal(upcoming[0].daysLeft, 2);
	});

	it("trouve la prochaine sortie strictement future", () => {
		const next = nextRelease(events, today);
		assert.equal(next.event.release, "Futur");
		assert.equal(next.daysLeft, 52);
	});

	it("filtre par profil seulement si demandé", () => {
		assert.equal(filterForProfile(events, "Carotte", false).length, events.length);
		assert.equal(filterForProfile(events, "Carotte", true).length, 0);
	});
});

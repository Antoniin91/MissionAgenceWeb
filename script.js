document.addEventListener("DOMContentLoaded", () => {
	const menuButton = document.querySelector(".menu-button");
	const menu = menuButton?.closest("header.header");
	const scrollButton = document.querySelector(".scroll-to-registration");
	const registrationSection = document.querySelector("#inscription-bain");

	scrollButton?.addEventListener("click", () => {
		registrationSection?.scrollIntoView({ behavior: "smooth", block: "start" });
	});

	if (menuButton && menu) {
		menuButton.setAttribute("aria-expanded", "true");
		menuButton.setAttribute("aria-label", "Réduire le menu");

		menuButton.addEventListener("click", () => {
			const isCollapsed = menu.classList.toggle("collapsed");

			menuButton.setAttribute("aria-expanded", String(!isCollapsed));
			menuButton.setAttribute(
				"aria-label",
				isCollapsed ? "Ouvrir le menu" : "Réduire le menu"
			);
		});
	}

	initPersonnelSearch();
});

const PERSONNEL = [
	{ nom: "Chihiro Ogino", profession: "Aide de bain (stagiaire)", type: "humain", emoji: "🎋" },
	{ nom: "Haku", profession: "Assistant de Yubaba", type: "esprit", emoji: "🐉" },
	{ nom: "Yubaba", profession: "Directrice de la maison de bains", type: "sorciere", emoji: "🧙‍♀️" },
	{ nom: "Zeniba", profession: "Magicienne retraitée", type: "sorciere", emoji: "🕯️" },
	{ nom: "Kamaji", profession: "Chauffeur de chaudière", type: "esprit", emoji: "🕷️" },
	{ nom: "Rin", profession: "Aide de bain expérimentée", type: "humain", emoji: "🧺" },
	{ nom: "Kaonashi", profession: "Client mystérieux", type: "esprit", emoji: "👻" },
	{ nom: "Chichiyaku", profession: "Assistant administratif", type: "esprit", emoji: "🗣️" },
	{ nom: "Aogaeru", profession: "Employé d'accueil", type: "esprit", emoji: "🐸" },
	{ nom: "Bou", profession: "Fils de Yubaba", type: "sorciere", emoji: "👶" },
];

const TYPE_LABELS = {
	humain: "Humain",
	esprit: "Esprit",
	sorciere: "Sorcière",
};

function initPersonnelSearch() {
	const listElement = document.querySelector("#personnel-list");
	const searchInput = document.querySelector("#recherche-nom");
	const professionSelect = document.querySelector("#filtre-profession");
	const typeSelect = document.querySelector("#filtre-type");
	const searchButton = document.querySelector("#bouton-recherche");
	const noResultsMessage = document.querySelector("#personnel-aucun-resultat");

	if (!listElement || !searchInput || !professionSelect || !typeSelect) {
		return;
	}

	fillFilterOptions(professionSelect, [...new Set(PERSONNEL.map((p) => p.profession))]);
	fillFilterOptions(typeSelect, Object.keys(TYPE_LABELS), TYPE_LABELS);

	const applyFilters = () => {
		const query = searchInput.value.trim().toLowerCase();
		const profession = professionSelect.value;
		const type = typeSelect.value;

		const results = PERSONNEL.filter((personne) => {
			const matchesQuery = personne.nom.toLowerCase().includes(query);
			const matchesProfession = !profession || personne.profession === profession;
			const matchesType = !type || personne.type === type;

			return matchesQuery && matchesProfession && matchesType;
		});

		renderPersonnel(listElement, results);

		if (noResultsMessage) {
			noResultsMessage.hidden = results.length > 0;
		}
	};

	searchInput.addEventListener("input", applyFilters);
	professionSelect.addEventListener("change", applyFilters);
	typeSelect.addEventListener("change", applyFilters);
	searchButton?.addEventListener("click", (event) => {
		event.preventDefault();
		applyFilters();
	});

	applyFilters();
}

function fillFilterOptions(selectElement, values, labels) {
	values.forEach((value) => {
		const option = document.createElement("option");
		option.value = value;
		option.textContent = labels ? labels[value] : value;
		selectElement.appendChild(option);
	});
}

function renderPersonnel(listElement, personnel) {
	listElement.innerHTML = "";

	personnel.forEach((personne) => {
		const card = document.createElement("div");
		card.className = "personnel-card";
		card.innerHTML = `
			<span class="personnel-emoji">${personne.emoji}</span>
			<h3>${personne.nom}</h3>
			<p class="personnel-profession">${personne.profession}</p>
			<span class="personnel-type">${TYPE_LABELS[personne.type]}</span>
		`;
		listElement.appendChild(card);
	});
}


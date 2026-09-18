document.addEventListener("DOMContentLoaded", () => {
	const menuButton = document.querySelector(".menu-button");
	const menu = menuButton?.closest("header.header");
	const scrollButton = document.querySelector(".scroll-to-registration");
	const registrationSection = document.querySelector("#inscription-bain");

	scrollButton?.addEventListener("click", () => {
		registrationSection?.scrollIntoView({ behavior: "smooth", block: "start" });
	});

	if (!menuButton || !menu) {
		return;
	}

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
});

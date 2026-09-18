document.addEventListener("DOMContentLoaded", () => {
	const menuButton = document.querySelector(".menu-button");
	const menu = menuButton?.closest("header.header");

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

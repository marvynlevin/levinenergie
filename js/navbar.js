document.addEventListener('DOMContentLoaded', () => {
    // --- Ancien code (survol) ---
    const productItems = document.querySelectorAll('.product-item');
    const allDivs = document.querySelectorAll('.product-info'); // Sélectionne toutes les divs à afficher

    productItems.forEach(item => {
        const targetDiv = document.getElementById(item.getAttribute('data-target'));

        // Afficher la div lors du survol et cacher les autres
        item.addEventListener('mouseenter', () => {
            allDivs.forEach(div => div.style.display = 'none'); // Cache toutes les divs
            targetDiv.style.display = 'flex'; // Affiche seulement la div liée
        });

        // Cacher la div si la souris sort de l'élément et de la div
        item.addEventListener('mouseleave', () => {
            if (!targetDiv.matches(':hover')) {
                targetDiv.style.display = 'none';
            }
        });

        // Cacher la div si la souris sort de la div
        targetDiv.addEventListener('mouseleave', () => {
            targetDiv.style.display = 'none';
        });
    });

    // --- Nouveau code (clic) ---
    const productClickItems = document.querySelectorAll('.product-item-click');
    const allClickDivs = document.querySelectorAll('.product-info-click'); // Sélectionne toutes les divs à afficher par clic
    let currentlyVisibleDiv = null; // Variable pour stocker l'élément visible via clic

    productClickItems.forEach(clickItem => {
        const targetClickDiv = document.getElementById(clickItem.getAttribute('data-target-click'));

        clickItem.addEventListener('click', (event) => {
            // Empêcher la propagation d'autres événements de type "mouseleave"
            event.stopPropagation();

            // Si la div liée est déjà visible, on la masque
            if (targetClickDiv === currentlyVisibleDiv) {
                targetClickDiv.style.display = 'none';
                currentlyVisibleDiv = null; // Réinitialise l'élément visible
            } else {
                // Masquer l'ancienne div visible, s'il y en a une
                if (currentlyVisibleDiv) {
                    currentlyVisibleDiv.style.display = 'none';
                }

                // Affiche la nouvelle div liée
                targetClickDiv.style.display = 'initial';
                currentlyVisibleDiv = targetClickDiv; // Met à jour la div visible
            }
        });

        // Ajout d'un événement pour empêcher la fermeture lorsqu'on clique à l'intérieur de la div
        targetClickDiv.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche la propagation de l'événement de fermeture
        });

        // Ajouter un événement global pour cacher la div si on clique ailleurs dans la page
        document.addEventListener('click', (event) => {
            if (currentlyVisibleDiv && !clickItem.contains(event.target) && !currentlyVisibleDiv.contains(event.target)) {
                currentlyVisibleDiv.style.display = 'none';
                currentlyVisibleDiv = null; // Réinitialise l'élément visible
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // --- Code du burger menu ---

    const burgerMenu = document.getElementById('burger-menu'); // L'icône du burger menu (SVG)
    const menuContainer = document.getElementById('menu-container'); // Le menu principal
    const subMenus = document.querySelectorAll('.submenu'); // Tous les sous-menus (s'ils existent)
    let isMenuVisible = false; // Pour suivre l'état du menu (ouvert ou fermé)

    // Fonction pour afficher/masquer le menu principal
    function toggleMenu() {
        if (isMenuVisible) {
            menuContainer.style.display = 'none'; // Cache le menu principal
            isMenuVisible = false;
        } else {
            menuContainer.style.display = 'initial'; // Affiche le menu principal
            isMenuVisible = true;
        }
    }

    // Clic sur l'icône du burger menu pour afficher ou cacher le menu
    burgerMenu.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêche la propagation de l'événement de clic
        toggleMenu(); // Appelle la fonction pour afficher/masquer le menu
    });

    // Empêcher le menu et ses sous-menus de se fermer si on clique dedans
    menuContainer.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêche la propagation du clic au document
    });

    // Pour les sous-menus, on peut aussi ajouter des événements si tu as besoin de les ouvrir/fermer
    subMenus.forEach(submenu => {
        submenu.addEventListener('click', (event) => {
            event.stopPropagation(); // Le clic dans le sous-menu ne ferme pas le menu principal
        });
    });

    // Clic en dehors du menu pour le fermer
    document.addEventListener('click', () => {
        if (isMenuVisible) {
            menuContainer.style.display = 'none'; // Cache le menu principal
            isMenuVisible = false;
        }
    });
});


const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

function updateCardPositions(direction) {
  const cards = $$(".list li");

  cards.forEach((card, index) => {
    card.classList.remove("off-left", "off-right");

    // On vérifie les classes pour s'assurer que seules les bonnes cartes sont visibles
    if (card.classList.contains("prev") || card.classList.contains("act") || card.classList.contains("next")) {
      return;
    }

    if (direction === 'next') {
      // Si on va vers la prochaine carte, les éléments à gauche doivent sortir par la gauche
      if (index < Array.from(cards).indexOf($(".prev"))) {
        card.classList.add("off-left");
      }

      // Les éléments à droite doivent sortir par la droite
      if (index > Array.from(cards).indexOf($(".next"))) {
        card.classList.add("off-right");
      }
    } else if (direction === 'prev') {
      // Si on revient en arrière, les éléments à droite doivent sortir par la droite
      if (index > Array.from(cards).indexOf($(".next"))) {
        card.classList.add("off-right");
      }

      // Les éléments à gauche doivent sortir par la gauche
      if (index < Array.from(cards).indexOf($(".prev"))) {
        card.classList.add("off-left");
      }
    }
  });
}

function next() {
  const nextElement = $(".next");

  if (nextElement) {
    const prevElement = $(".prev");
    const actElement = $(".act");

    if (prevElement) {
      prevElement.classList.add("off-left"); // Sortir par la gauche
      prevElement.classList.remove("prev");
    }

    if (actElement) {
      actElement.classList.add("prev");
      actElement.classList.remove("act");
    }

    nextElement.classList.add("act");
    nextElement.classList.remove("next");

    const newNextElement = nextElement.nextElementSibling;
    if (newNextElement) {
      newNextElement.classList.add("next");
      updateCardPositions('next'); // Mise à jour des positions
    } else {
      // Si on atteint la fin, on ne fait plus rien
      console.log("Fin de la liste");
    }
  }
}

function prev() {
  const prevElement = $(".prev");

  if (prevElement) {
    const nextElement = $(".next");
    const actElement = $(".act");

    if (nextElement) {
      nextElement.classList.add("off-right"); // Sortir par la droite
      nextElement.classList.remove("next");
    }

    if (actElement) {
      actElement.classList.add("next");
      actElement.classList.remove("act");
    }

    prevElement.classList.add("act");
    prevElement.classList.remove("prev");

    const newPrevElement = prevElement.previousElementSibling;
    if (newPrevElement) {
      newPrevElement.classList.add("prev");
      newPrevElement.classList.remove("hide");
      updateCardPositions('prev'); // Mise à jour des positions
    } else {
      // Si on atteint le début, on ne fait plus rien
      console.log("Début de la liste");
    }
  }
}

// Initialisation et gestion des événements
const slider = $(".list"),
      swipe = new Hammer($(".swipe"));

slider.onclick = event => {
  if (event.target.classList.contains('next')) {
    next();
  } else if (event.target.classList.contains('prev')) {
    prev();
  }
};

swipe.on("swipeleft", () => {
  next();
});

swipe.on("swiperight", () => {
  prev();
});

// Initial update to place cards properly
updateCardPositions();

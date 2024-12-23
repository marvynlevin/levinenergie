class Carousel {
    images = [];
    /**
     * @type HTMLElement
     */
    htmlElement = null;
    carouselId = "";

    // Par défaut on sélectionnera la card 0
    currentSelectedCard = 0;

    // Minuteur pour le défilement automatique
    autoSwipeInterval = null;

    /**
     * @param images {Array<{ img: String, desc: String }>} La suite d'images avec leurs descriptions
     * @param carouselId {String} Une ID permettant d'identifier les éléments du carousel. Ne doit pas être un nombre
     */
    constructor(images, carouselId) {
        this.images = images;
        this.carouselId = carouselId;
    }

    /**
     * Permet de définir quel élément HTML sera le carousel. Ne dois pas être executé plusieurs fois; à ses risques et périls
     * @param htmlElement {HTMLElement}
     */
    bindTo(htmlElement) {
        this.htmlElement = htmlElement;

        console.log(this.htmlElement);

        // On va venir y ajouter toutes nos cards :)
        for (let [index, card] of this.images.entries()) {
            this.addCard(card, index, index === 0);
        }

        // On va ensuite créer des écoutes d'évènements pour nos flèches (controle droite-gauche)
        this.htmlElement
            .querySelector(".control .left")
            .addEventListener("click", () => {
                this.swipeLeft();
                this.resetAutoSwipe();
            });

        this.htmlElement
            .querySelector(".control .right")
            .addEventListener("click", () => {
                this.swipeRight();
                this.resetAutoSwipe();
            });

        // Lancement du défilement automatique
        this.startAutoSwipe();
    }

    swipeRight() {
        if (this.currentSelectedCard === this.images.length - 1) return;

        this.hideAllCards(++this.currentSelectedCard);
        this.applyFlash();
    }

    swipeLeft() {
        if (this.currentSelectedCard === 0) return;

        this.hideAllCards(--this.currentSelectedCard);
        this.applyFlash();
    }

    applyFlash() {
        const currentCard = this.htmlElement.querySelector(
            `.card#${this.carouselId}${this.currentSelectedCard}`
        );
        currentCard.classList.add("flash");

        // Retirer la classe après l'animation
        setTimeout(() => {
            currentCard.classList.remove("flash");
        }, 100); // Doit correspondre à la durée de l'animation CSS
    }

    /**
     * @param except {number} Permet d'afficher une carte spécifique
     */
    hideAllCards(except) {
        this.htmlElement.querySelectorAll(".content .card").forEach(function (card, _) {
            let index = card.id.replace(carousel.carouselId, "");

            // On va cacher la card si ce n'est pas celle qu'on veut
            card.style["display"] = index == except ? "inherit" : "none";
        });
    }

    /**
     * Méthode interne permettant d'ajouter une card dans le html :D
     *
     * @param data { { img: String, desc: String } } les infos sur la carte
     * @param index {number} L'index de la carte dans `this.images`
     * @param visible {Boolean} Si cette card doit être visible
     */
    addCard(data, index, visible = false) {
        // On va créer notre HTML
        let cardId = `${this.carouselId}${index}`;

        // On va y mettre le HTML de la card
        let cardHtml = `<div class="card" id="${cardId}" style="display: ${
            visible ? "inherit" : "none"
        }">
            <img alt="image" src="${data.img}">
            ${
                typeof data.desc == "string" && data.desc.length > 0
                    ? `<h1 class="text-carrousel text-pos" style="max-width: 58%; margin-left: 10%; margin-right: 10%">${data.desc}</h1></div>`
                    : ""
            }
        </div>`;

        // On va venir l'insérer comme un gros bourrin
        // le `.querySelector(".content")` permet de sélectionner `<div class="content">`
        this.htmlElement.querySelector(".content").innerHTML += cardHtml;
    }

    /**
     * Démarre le défilement automatique
     */
    startAutoSwipe() {
        this.autoSwipeInterval = setInterval(() => {
            this.swipeRight();

            // Retour au début si la dernière image est atteinte
            if (this.currentSelectedCard === this.images.length - 1) {
                this.currentSelectedCard = -1; // Passera à 0 au prochain appel de swipeRight()
            }
        }, 6000); // 6 secondes
    }

    /**
     * Réinitialise le minuteur du défilement automatique
     */
    resetAutoSwipe() {
        clearInterval(this.autoSwipeInterval); // Arrête le défilement
        this.startAutoSwipe(); // Redémarre le défilement
    }
}

// On définit le carousel et on ajoute les images
const carousel = new Carousel(
    [
        { img: "/static/img/PAC1.jpg", desc: "Levin Energie chauffagiste à Etupes" },
        { img: "/static/img/PAC2.jpg", desc: "Levin Energie chauffagiste à Etupes" },
        { img: "/static/img/salleDeBains1.jpg", desc: "Levin Energie chauffagiste à Etupes" },
        { img: "/static/img/salleDeBains2.jpg", desc: "Levin Energie chauffagiste à Etupes" },
    ],
    "plats_carousel"
);

// Quand la page sera entièrement chargée, on va lancer le carousel
document.addEventListener("DOMContentLoaded", function () {
    // On va ensuite lui donner l'élément HTML où l'ID est 'plats' :)
    carousel.bindTo(document.getElementById("plats"));
});

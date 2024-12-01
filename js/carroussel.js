// Mapping des ID vers leurs données d'images
const carouselData = {
    carouselAccueil: [
        {img: "/static/img/illustrationImage2.png", desc: "Levin Energie chauffagiste à Etupes"},
        {img: "/static/img/PAC1.jpg", desc: "Votre pompe à chaleur sur mesure"},
        {img: "/static/img/PAC2.jpg", desc: "Votre pompe à chaleur sur mesure"},
        {img: "/static/img/FROLING5.png", desc: "Nous vous proposons une large gamme de chauffage"},
        {img: "/static/img/salleDeBains1.jpg", desc: "Création de salle de bain de A à Z"},
        {img: "/static/img/salleDeBains2.jpg", desc: "Création de salle de bain de A à Z"}
    ],
    carouselApropos: [
        {img: "/static/img/illustrationImage2.png", desc: "A propos de l'entreprise Levin Energie"},
        {img: "/static/img/illustrationImage2.png", desc: "Histoire de l'entreprise Levin Energie"},
        {img: "/static/img/illustrationImage2.png", desc: "Services de l'entreprise Levin Energie"},
    ],
    carouselChaudieres: [
        {img: "/static/img/illustrationImage2.png", desc: "Chaudière à condensation gaz-fioul"},
        {img: "/static/img/illustrationImage2.png", desc: "Chaudière bois-granulés ou mixte"},
        {img: "/static/img/illustrationImage2.png", desc: "Poêle bois-granulés"},
    ],
    carouselPac: [
        {img: "/static/img/illustrationImage2.png", desc: "Pompe à chaleur air-eau"},
        {img: "/static/img/illustrationImage2.png", desc: "Pompe à chaleur air-air"},
        {img: "/static/img/illustrationImage2.png", desc: "Pompe à chaleur géothermique"},
    ],
    carouselPanneauxSolaires: [
        {img: "/static/img/illustrationImage2.png", desc: "Panneaux solaires thermiques"},
        {img: "/static/img/illustrationImage2.png", desc: "Panneaux photovoltaïques"},
    ],
    carouselChauffeEau: [
        {img: "/static/img/illustrationImage2.png", desc: "Chauffe-eau solaire"},
        {img: "/static/img/illustrationImage2.png", desc: "Chauffe-eau thermodynamique"},
        {img: "/static/img/illustrationImage2.png", desc: "Chauffe-eau électrique"},
    ],
    carouselPlomberieSanitaire: [
        {img: "/static/img/illustrationImage2.png", desc: "Salle de bains"},
        {img: "/static/img/illustrationImage2.png", desc: "Chauffage central"},
        {img: "/static/img/illustrationImage2.png", desc: "Désembouage hydraulique"},
    ],
};

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
     * @param carouselId {String} Une ID permettant d'identifier les éléments du carousel.
     */
    constructor(images, carouselId) {
        this.images = images;
        this.carouselId = carouselId;
    }

    /**
     * Permet de définir quel élément HTML sera le carousel. Ne doit pas être exécuté plusieurs fois.
     * @param htmlElement {HTMLElement}
     */
    bindTo(htmlElement) {
        this.htmlElement = htmlElement;

        console.log(this.htmlElement);

        // Ajouter toutes les cards
        for (let [index, card] of this.images.entries()) {
            this.addCard(card, index, index === 0);
        }

        // Ajouter les évènements pour les flèches
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

        // Lancer le défilement automatique
        this.startAutoSwipe();
    }

    swipeRight() {
        // Si on est à la dernière image, revenir à la première
        if (this.currentSelectedCard === this.images.length - 1) {
            this.currentSelectedCard = 0; // Réinitialiser à la première image
        } else {
            this.currentSelectedCard++;
        }

        this.hideAllCards(this.currentSelectedCard);
        this.applyFlash();
    }

    swipeLeft() {
        if (this.currentSelectedCard === 0) {
            this.currentSelectedCard = this.images.length;
        }
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
        }, 300);
    }

    /**
     * @param except {number} Permet d'afficher une carte spécifique
     */
    hideAllCards(except) {
        this.htmlElement.querySelectorAll(".content .card").forEach((card) => {
            let index = card.id.replace(this.carouselId, "");
            card.style["display"] = index == except ? "inherit" : "none";
        });
    }

    /**
     * Ajouter une card dans le HTML
     * @param data { { img: String, desc: String } }
     * @param index {number}
     * @param visible {Boolean}
     */
    addCard(data, index, visible = false) {
        let cardId = `${this.carouselId}${index}`;
        let cardHtml = `<div class="card" id="${cardId}" style="display: ${
            visible ? "inherit" : "none"
        }">
            <img alt="image" src="${data.img}">
            ${
            data.desc
                ? `<h1 class="text-carrousel text-pos" style="max-width: 58%; margin-left: 8%; margin-right: 8%">${data.desc}</h1>`
                : ""
        }
        </div>`;

        this.htmlElement.querySelector(".content").innerHTML += cardHtml;
    }

    /**
     * Démarre le défilement automatique
     */
    startAutoSwipe() {
        this.autoSwipeInterval = setInterval(() => {
            this.swipeRight();

            if (this.currentSelectedCard === this.images.length - 1) {
                this.currentSelectedCard = -1;
            }
        }, 4250);
    }

    /**
     * Réinitialise le minuteur du défilement automatique
     */
    resetAutoSwipe() {
        clearInterval(this.autoSwipeInterval);
        this.startAutoSwipe();
    }
}

/**
 * Initialise tous les carrousels sur la page
 */
document.addEventListener("DOMContentLoaded", function () {
    for (let [id, images] of Object.entries(carouselData)) {
        const carouselElement = document.getElementById(id);

        if (carouselElement) {
            const carousel = new Carousel(images, id);
            carousel.bindTo(carouselElement);
        }
    }
});

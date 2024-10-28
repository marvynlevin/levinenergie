/**
 * Cette class permet de définir un carousel et de l'associer à un élément HTML
 */
class Carousel {
    // On retrouve nos propriétés ici
    images = []
    /**
     * @type HTMLElement
     */
    htmlElement = null;
    carouselId = ""

    // Par défaut on sélectionnera la card 0
    currentSelectedCard = 0;

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

        console.log(this.htmlElement)

        // On va venir y ajouter toutes nos cards :)
        for (let [index, card] of this.images.entries()) {
            this.addCard(card, index, index === 0)
        }

        // On va ensuite créer des écoutes d'évènements pour nos flèches (controle droite-gauche)
        this.htmlElement
            .querySelector(".control .left")
            .addEventListener("click", () => this.swipeLeft());

        this.htmlElement
            .querySelector(".control .right")
            .addEventListener("click", () => this.swipeRight());
    }


    swipeRight() {
        if (this.currentSelectedCard === this.images.length - 1)
            return;

        this.hideAllCards(++this.currentSelectedCard);
        this.applyFlash();
    }

    swipeLeft() {
        if (this.currentSelectedCard === 0)
            return;

        this.hideAllCards(--this.currentSelectedCard);
        this.applyFlash();
    }

    applyFlash() {
        const currentCard = this.htmlElement.querySelector(`.card#${this.carouselId}${this.currentSelectedCard}`);
        currentCard.classList.add('flash');

        // Retirer la classe après l'animation
        setTimeout(() => {
            currentCard.classList.remove('flash');
        }, 12000); // Doit correspondre à la durée de l'animation CSS
    }

    /**
     * @param except {number} Permet d'afficher une carte spécifique
     */
    hideAllCards(except) {
        this.htmlElement
            .querySelectorAll(".content .card")
            .forEach(function (card, _) {
                let index = card.id.replace(carousel.carouselId, "");

                // On va cacher la card si ce n'est pas celle qu'on veut
                card.style["display"] = index == except ? "inherit" : "none";
            })
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
        let cardHtml =
            `<div class="card" id="${cardId}" style="display: ${visible ? "inherit" : "none"}">
    <img alt="image" src="${data.img}"> 
    ${typeof data.desc == "string" && data.desc.length > 0 ? `<h1 class="text-pos tel-45px" style="max-width: 58%; margin-left: 10%; margin-right: 10%">${data.desc}</h1></div>` : ''}
</div>`;


        // On va venir l'insérer comme un gros bourrin
        // le `.querySelector(".content")` permet de sélectionner `<div class="content">`
        this.htmlElement.querySelector(".content").innerHTML += cardHtml;
    }
}

// On définit le carousel et on ajoute les images
const carousel = new Carousel(
    [
        {
            img: "/static/img/illustrationImage2.png",
            desc: "Votre chauffagiste sur Etupes"
        },
        {
            img: "/static/img/illustrationImage2.png",
            desc: "Votre chauffagiste sur Etupes"
        },
        {
            img: "/static/img/illustrationImage2.png",
            desc: "Votre chauffagiste sur Etupes"
        },
        {
            img: "/static/img/illustrationImage2.png",
            desc: "Votre chauffagiste sur Etupes"
        }
    ],
    "plats_carousel"
)

// Quand la page sera entièrement chargée, on va lancer le carousel
document.addEventListener("DOMContentLoaded", function () {
    // On va ensuite lui donner l'élément HTML où l'ID est 'plats' :)
    carousel.bindTo(document.getElementById("plats"))
})
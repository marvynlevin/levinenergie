// Sélection des éléments principaux
const $carouselNew = $('.carousel-new');
const $carouselItemsNew = $('.carousel-item-new');
let currentItemPositionNew = 0;
let carouselIntervalNew;

// Fonction pour aller au slide suivant
const goToNextSlideNew = () => {
   const lastItem = `.item-${currentItemPositionNew}-new`;
   currentItemPositionNew = (currentItemPositionNew + 1) % $carouselItemsNew.length;
   const currentItem = `.item-${currentItemPositionNew}-new`;

   setNodeAttributesNew(lastItem, currentItem);
};

// Fonction pour aller au slide précédent
const goToPreviousSlideNew = () => {
   const lastItem = `.item-${currentItemPositionNew}-new`;
   currentItemPositionNew =
      (currentItemPositionNew - 1 + $carouselItemsNew.length) % $carouselItemsNew.length;
   const currentItem = `.item-${currentItemPositionNew}-new`;

   setNodeAttributesNew(lastItem, currentItem);
};

// Fonction pour appliquer les attributs des slides
const setNodeAttributesNew = (lastItem, currentItem) => {
   $(lastItem).css('display', 'none').attr('aria-hidden', 'true');
   $(currentItem).css('display', 'block').attr('aria-hidden', 'false');
};

// Initialisation des boutons
const createCarouselControls = () => {
   const leftControl = $('<div>')
      .addClass('carousel-controls left')
      .append(
         $('<span>\n' +
             '<svg width="84" height="123" viewBox="0 0 84 123" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
             '<g clip-path="url(#clip0_92_223)">\n' +
             '<path d="M56.114 16.1333L26.0608 60.1395C25.5512 60.8857 25.5512 62.0911 26.0608 62.8373L56.114 106.863C56.6367 107.59 57.4599 107.571 57.9563 106.824C58.4398 106.078 58.4398 104.911 57.9563 104.165L28.831 61.4979L57.9563 18.8501C58.4528 18.0847 58.4398 16.8793 57.9302 16.1523C57.4205 15.4255 56.6235 15.4255 56.114 16.1333Z" fill="#444444" stroke="#444444" stroke-width="2.06867"/>\n' +
             '</g>\n' +
             '<defs>\n' +
             '<clipPath id="clip0_92_223">\n' +
             '<rect width="123" height="84" fill="white" transform="matrix(0 -1 1 0 0 123)"/>\n' +
             '</clipPath>\n' +
             '</defs>\n' +
             '</svg>\n</span>').addClass('img-c-new').append(
            $('<i>').addClass('fa fa-arrow-circle-left-new').attr('aria-hidden', 'true')
         )
      )
      .click(goToPreviousSlideNew);

   const rightControl = $('<div>')
      .addClass('carousel-controls right')
      .append(
         $('<span>\n' +
             '<svg width="84" height="123" viewBox="0 0 84 123" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
             '<g clip-path="url(#clip0_92_218)">\n' +
             '<path d="M27.886 106.867L57.9392 62.8605C58.4488 62.1143 58.4488 60.9089 57.9392 60.1627L27.886 16.1373C27.3633 15.4103 26.5401 15.4293 26.0437 16.1755C25.5602 16.9217 25.5602 18.0889 26.0437 18.8351L55.169 61.5021L26.0437 104.15C25.5472 104.915 25.5602 106.121 26.0698 106.848C26.5795 107.575 27.3765 107.575 27.886 106.867Z" fill="#444444" stroke="#444444" stroke-width="2.06867"/>\n' +
             '</g>\n' +
             '<defs>\n' +
             '<clipPath id="clip0_92_218">\n' +
             '<rect width="123" height="84" fill="white" transform="matrix(0 1 -1 0 84 0)"/>\n' +
             '</clipPath>\n' +
             '</defs>\n' +
             '</svg>\n</span>').addClass('img-c-new').append(
            $('<i>').addClass('fa fa-arrow-circle-right-new').attr('aria-hidden', 'true')
         )
      )
      .click(goToNextSlideNew);

   $carouselNew.append(leftControl, rightControl);
};

// Initialisation automatique des slides
$(document).ready(() => {
   createCarouselControls();
   carouselIntervalNew = setInterval(goToNextSlideNew, 5000);

   $(document).keydown((e) => {
      const keyCode = e.keyCode || e.which;
      if (keyCode === 39) goToNextSlideNew();
      else if (keyCode === 37) goToPreviousSlideNew();
   });
});


$(document).ready(function () {
   carouselIntervalNew = setInterval(() => goToNextSlideNew(), 5000);
});

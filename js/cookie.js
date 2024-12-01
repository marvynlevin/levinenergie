document.addEventListener('DOMContentLoaded', function () {
    console.log('Page chargée. Début du script.');

    const cookieConsentPopup = document.getElementById('cookieConsentPopup');
    const togglePopupBtn = document.getElementById('togglePopupBtn');

    // Vérifie si les éléments sont correctement récupérés
    if (!cookieConsentPopup) {
        console.error('Element #cookieConsentPopup non trouvé !');
    }
    if (!togglePopupBtn) {
        console.error('Element #togglePopupBtn non trouvé !');
    }

    // Vérifier si un consentement a déjà été pris
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    console.log('cookiesAccepted:', cookiesAccepted);

    // Si aucune décision n'a été prise, afficher la popup par défaut
    if (!cookiesAccepted) {
        cookieConsentPopup.style.display = 'block';
        togglePopupBtn.style.display = 'none'; // Cacher le bouton au début
        console.log('Popup affichée, aucune décision précédente.');
    } else {
        // Si l'utilisateur a déjà fait un choix, afficher un bouton
        cookieConsentPopup.style.display = 'none';
        togglePopupBtn.style.display = 'block';
        console.log('Choix précédent trouvé, bouton affiché.');
    }

    // Gestion du clic sur le bouton "Accepter"
    document.getElementById('acceptCookiesBtn').addEventListener('click', function (event) {
        event.preventDefault(); // Empêche tout comportement par défaut
        console.log('Clic sur "Accepter"');
        localStorage.setItem('cookiesAccepted', 'true');
        location.reload(); // Forcer le rafraîchissement de la page
    });

    // Gestion du clic sur le bouton "Refuser"
    document.getElementById('refuseCookiesBtn').addEventListener('click', function (event) {
        event.preventDefault(); // Empêche tout comportement par défaut
        console.log('Clic sur "Refuser"');
        localStorage.setItem('cookiesAccepted', 'false');
        location.reload(); // Forcer le rafraîchissement de la page
    });

    // Gestion du clic sur le bouton toggle
    togglePopupBtn.addEventListener('click', function () {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        console.log('Clic sur le bouton toggle. cookiesAccepted:', cookiesAccepted);

        // Si le bouton est en "Off", afficher la popup et masquer le bouton
        if (cookiesAccepted === 'false' || cookiesAccepted === 'true' || cookiesAccepted === null) {
            cookieConsentPopup.style.display = 'block'; // Ouvre la popup si les cookies sont désactivés ou non choisis
            togglePopupBtn.style.display = 'none'; // Cacher le bouton toggle quand la popup est ouverte
            console.log('Réouverture de la popup.');
        } else {
            console.log('Popup fermée car cookies sont activés.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const iframeContainer = document.getElementById('iframeContainer');

    // Vérifie que le conteneur existe
    if (!iframeContainer) {
        console.error('Element #iframeContainer non trouvé ! Assurez-vous que cet élément est présent dans le HTML.');
        return; // Arrête l'exécution si le conteneur est introuvable
    }

    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (cookiesAccepted === 'true') {
        console.log('Consentement donné. Chargement de l\'iframe.');
        iframeContainer.innerHTML = `
            <iframe width="100%" height="250px"
                title="localisation entreprise levin energie"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.1355217320147!2d6.8656915000000005!3d47.5067519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47921958342aa209%3A0x2e778849a29cf7ef!2sLEVIN%20ENERGIE!5e0!3m2!1sfr!2sfr!4v1732118255589!5m2!1sfr!2sfr"
                style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        `;
    } else {
        console.log('Consentement non donné. Iframe non chargé.');
        iframeContainer.innerHTML = `
            <p>Veuillez activer les cookies pour afficher la localisation maps</p>
        `;
    }
});

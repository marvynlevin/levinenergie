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
        // togglePopupBtn.textContent = cookiesAccepted === 'true' ? 'Cookies' : 'Cookies';
        console.log('Choix précédent trouvé, bouton affiché.');
    }

    // Gestion du clic sur le bouton "Accepter"
    document.getElementById('acceptCookiesBtn').addEventListener('click', function() {
        console.log('Clic sur "Accepter"');
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsentPopup.style.display = 'none';  // Masquer la popup après le consentement
        // togglePopupBtn.textContent = 'Cookies'; // Changer le texte du bouton
        togglePopupBtn.style.display = 'block'; // Afficher le bouton
        console.log('Consentement accepté');
    });

    // Gestion du clic sur le bouton "Refuser"
    document.getElementById('refuseCookiesBtn').addEventListener('click', function() {
        console.log('Clic sur "Refuser"');
        localStorage.setItem('cookiesAccepted', 'false');
        cookieConsentPopup.style.display = 'none'; // Masquer la popup après le refus
        // togglePopupBtn.textContent = 'Cookies'; // Changer le texte du bouton
        togglePopupBtn.style.display = 'block'; // Afficher le bouton
        console.log('Consentement refusé');
    });

    // Gestion du clic sur le bouton toggle
    togglePopupBtn.addEventListener('click', function() {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        console.log('Clic sur le bouton toggle. cookiesAccepted:', cookiesAccepted);

        // Si le bouton est en "Off", afficher la popup et masquer le bouton
        if (cookiesAccepted === 'false' || cookiesAccepted === 'true' || cookiesAccepted === null) {
            cookieConsentPopup.style.display = 'block'; // Ouvre la popup si les cookies sont désactivés ou non choisis
            togglePopupBtn.style.display = 'none'; // Cacher le bouton toggle quand la popup est ouverte
            console.log('Réouverture de la popup.');
        } else {
            // Si les cookies sont activés (cookiesAccepted === 'true'), il est possible de masquer ou laisser le bouton visible
            console.log('Popup fermée car cookies sont activés.');
        }
    });
});

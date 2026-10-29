<?php

// 1. Bloquer l'accès direct via GET
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Méthode non autorisée.');
}

// 2. Détection du piège Honeypot (Spambot)
if (!empty($_POST['website'])) {
    exit('Demande bloquée.');
}

// 3. Validation de la case à cocher
if (!isset($_POST['conditions'])) {
    exit('Vous devez accepter les conditions.');
}

// 4. Nettoyage anti-injection d'en-têtes
function sanitize_header_input($data) {
    $data = trim($data);
    return str_replace(array("\r", "\n", "%0a", "%0d"), '', $data);
}

$nom             = sanitize_header_input($_POST['nom'] ?? '');
$email           = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telephone       = sanitize_header_input($_POST['telephone'] ?? '');
$adresse         = sanitize_header_input($_POST['adresse'] ?? '');
$type_prestation = sanitize_header_input($_POST['type_prestation'] ?? '');
$equipement      = sanitize_header_input($_POST['equipement'] ?? '');
$message         = trim($_POST['message'] ?? '');

// 5. Validation stricte des données obligatoires
if (empty($nom) || empty($email) || empty($telephone) || empty($adresse) || empty($type_prestation) || empty($message)) {
    exit('Veuillez remplir tous les champs obligatoires.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit('Adresse e-mail non valide.');
}

if (!preg_match('/^[0-9\-\+\s]{8,20}$/', $telephone)) {
    exit('Numéro de téléphone non valide.');
}

// 6. Construction du message (texte brut structuré)
$to = 'contact@levinenergie.fr';
$subject = 'Formulaire [' . $type_prestation . '] : ' . $nom;

$body  = "Nouveau message depuis le site web :\n\n";
$body .= "--- COORDONNÉES DU CLIENT ---\n";
$body .= "Nom & Prénom          : " . $nom . "\n";
$body .= "E-mail                : " . $email . "\n";
$body .= "Téléphone             : " . $telephone . "\n";
$body .= "Adresse Postale       : " . $adresse . "\n\n";

$body .= "--- INFORMATIONS CHAUFFAGE ---\n";
$body .= "Type de prestation    : " . $type_prestation . "\n";
$body .= "Machine / Modèle      : " . (!empty($equipement) ? $equipement : 'Non renseigné') . "\n\n";

$body .= "--- DESCRIPTION DU PROBLÈME ---\n";
$body .= $message . "\n";

// 7. En-têtes sécurisés
$headers  = "From: contact@levinenergie.fr\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 8. Envoi de l'e-mail
if (mail($to, $subject, $body, $headers)) {
    header('Location: merci.html');
    exit();
} else {
    echo 'Une erreur est survenue lors de l\'envoi du message.';
}
<?php
// Vérifier que la méthode HTTP utilisée est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Filtrer et valider les données reçues
    $nom = htmlspecialchars($_POST['nom'], ENT_QUOTES, 'UTF-8');
    $telephone = htmlspecialchars($_POST['telephone'], ENT_QUOTES, 'UTF-8');
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

    // Vérifier le consentement des conditions
    if (empty($_POST['conditions'])) {
        echo 'Vous devez accepter les conditions pour envoyer le message.';
        exit;
    }

    // Validation des champs obligatoires
    if (empty($nom) || empty($telephone) || empty($email) || empty($message)) {
        echo 'Tous les champs marqués d\'une astérisque (*) sont obligatoires.';
        exit;
    }

    if (!$email) {
        echo 'L\'adresse e-mail fournie est invalide.';
        exit;
    }

    // 2. Configuration de l'e-mail
    $to = "contact@levinenergie.fr"; // Adresse de destination
    $subject = "Nouveau message depuis le site";
    $message_body = "Vous avez reçu un message de $nom :\n\nTéléphone : $telephone\n\nE-mail : $email\n\nMessage :\n$message";
    $headers = "From: $nom <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // 3. Envoi de l'email
    if (mail($to, $subject, $message_body, $headers)) {
        // L'email a été envoyé avec succès
        header('Location: merci.html'); // Rediriger vers une page de remerciement
        exit;
    } else {
        // Une erreur s'est produite lors de l'envoi
        echo 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.';
    }
} else {
    // Méthode HTTP non autorisée
    echo 'Méthode non autorisée.';
    exit;
}
?>

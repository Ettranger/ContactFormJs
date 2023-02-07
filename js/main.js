
function onSubmitForm (event) {
    
    // Annuler le comportement par défaut du navigateur
    event.preventDefault();

    // Récupérer les donnnées du formulaire avec class formData
    // La propriété currentTarget de l'objet event contient l'élément déclencheur de l'événement
    const form = event.currentTarget; // On récupère l'élément <form>
    const formData = new FormData(form); // On récupère les données (valeurs) du formulaire

    // On envoie ces données dans une requête HTTP AJAX via la fonction fetch()
    const url = 'sendMail.php';
    const options = {
        method: 'POST',
        body: formData
    };

    // Envoi de la requête HTTP (AJAX)
    fetch(url, options)
        .then(function(response) {
            // On récupère la réponse HTTP et on en extrait les données du body (corps)
            return response.json();
        })
        .then(function(data) {
            // Ici je récupère les données renvoyées par le serveur dans la réponse HTTP
            console.log(data);

            if ("success" in data) {
                const container = document.getElementById('success-message');
                container.textContent =  data.success;
                container.classList.remove ('hidden');
            }
            else if (data.hasOwnProperty("errors")) {
                console.log(data.errors);
            }
        });

}

// CODE PARINCIPAL
document.getElementById('contact-form').addEventListener('submit', onSubmitForm);
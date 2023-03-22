const loginForm = document.querySelector("#login");

//Récupération des pièces eventuellement stockées dans le localStorage
const token = window.localStorage.getItem("token");
if (token) {
  document.location.href = "index.html";
}

//ajout d'un event listener sur l'évènement submit de la balise form.
loginForm.addEventListener("submit", async function (event) {
  //Désactivation du comportement par defaut du navigateur (à la base: change l'url et charge une new page), on gère ns-mm la communication ac le serveur
  event.preventDefault();

  //Construction de la charge utile (création d'une propriété)
  //Je construit un objet en reprenant les valeurs des balises input du formulaire
  const connexion = {
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value,
  };
  //Création de la charge utile au format JSON (appel de la fonction JSON.stringify)
  const chargeUtile = JSON.stringify(connexion);

  //configuration d'une requête pour qu'elle soit envoyée avec le verbe post et un objet au format JSON comme charge utile :
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile,
  });
  console.log(response);

  if (response.status === 200) {
    const data = await response.json();
    //on enregistre les données recues dans le localStorage avec setItem
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("userId", data.userId);
    //Propriété en lecture seule renvoie à un obj location
    document.location.href = "index.html";
  } else {
    alert("Erreur dans l’identifiant ou le mot de passe");
  }
});

//On rattache div HTML
const divGallery = document.querySelector(".gallery");
let listeTravaux;
//Appel de l'API works
async function works() {
  const response = await fetch("http://localhost:5678/api/works");
  listeTravaux = await response.json();
  console.log(listeTravaux);
  afficheWorks(listeTravaux);
}

function afficheWorks(travauxAAfficher) {
  divGallery.innerHTML = "";
  // Entourer notre code avec une boucle for.
  // Cela permet de créer toutes les fiches produits de notre site.
  for (let i = 0; i < travauxAAfficher.length; i++) {
    //Création des balises
    const projet = travauxAAfficher[i];

    const figureElement = document.createElement("figure");
    divGallery.appendChild(figureElement);

    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = projet.imageUrl;
    figureElement.appendChild(imageUrlElement);

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = projet.title;
    figureElement.appendChild(titleElement);
  }
}
works();

const divMenu = document.querySelector("#menu-bouton");
const all = document.querySelector("#all");
all.addEventListener("click", () => {
  afficheWorks(listeTravaux);
});
//Appel de l'API catégories
async function categories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const listeCategories = await response.json();
  console.log(listeCategories);

  for (let index = 0; index < listeCategories.length; index++) {
    const category = listeCategories[index];

    const buttonElement = document.createElement("button");
    buttonElement.innerText = category.name;
    buttonElement.className = "button-category"; //Creation d'une classe "button-category" pour chaque bouton (css)
    divMenu.appendChild(buttonElement);

    buttonElement.addEventListener("click", () => {
      console.log(listeTravaux);
      const travauxFiltres = listeTravaux.filter(function (work) {
        return work.categoryId === category.id;
      });
      afficheWorks(travauxFiltres);
      console.log(listeTravaux);
    });
  }
}
categories();

function disconnected() {
  window.localStorage.clear("token");
  //quand on click sur logout ca renvoi à index.html
  window.location.replace("index.html");
}

//si ya une valeur dans le localStorage (token)
if (localStorage.getItem("token")) {
  //afficher les modif apportée sur html
  document.getElementById("menu-bouton").style.display = "none";
  document.querySelector(".mode-edition").style.display = "flex";
  document.querySelector(".btn-modifier1").style.display = "block";
  document.querySelector(".btn-modifier2").style.display = "block";
  document.querySelector(".lien-login").style.display = "none";
  document.querySelector(".lien-logout").style.display = "block";
  //ajout d'un event listener sur l'évènement click, je fais appel a la fonction creer plus haut
  document
    .querySelector(".lien-logout")
    .addEventListener("click", disconnected);
} else {
  //sinon ne pas les faire apparaître
  document.querySelector(".mode-edition").style.display = "none";
  document.querySelector(".btn-modifier1").style.display = "none";
  document.querySelector(".btn-modifier2").style.display = "none";
  document.querySelector(".lien-logout").style.display = "none";
}

//On rattache div HTML
const divGallery = document.querySelector(".gallery");

//Appel de l'API works
async function works() {
  const response = await fetch("http://localhost:5678/api/works");
  const listeTravaux = await response.json();
  console.log(listeTravaux);
  // Boucle For afin de générer tout la liste
  for (let i = 0; i < listeTravaux.length; i++) {
    //Création des balises
    const projet = listeTravaux[i];

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
      //refait une requête avec la route api/works
      async function works() {
        const response = await fetch("http://localhost:5678/api/works");
        const listeTravaux = await response.json();
        // for (let i = 0; i < listeTravaux.length; i++) {
        //   const projet = listeTravaux[i];
        // }
      }
      console.log(buttonElement);
    });
  }
}

categories();

// const boutonFiltrer = document.querySelector(".btn-filtrer");

// boutonFiltrer.addEventListener("click", function () {
//    const piecesFiltrees = pieces.filter(function (piece) {
//        return piece.prix <= 35;
//    });
//    ;

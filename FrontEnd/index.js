//On rattache div HTML
const divGallery = document.querySelector(".gallery");

//Appel de l'API works
async function works() {
  const response = await fetch("http://localhost:5678/api/works");
  const listeTravaux = await response.json();
  console.log(listeTravaux);

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

//Appel de l'API catégories
async function categories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const listeCategories = await response.json();
  console.log(listeCategories);
}

categories();

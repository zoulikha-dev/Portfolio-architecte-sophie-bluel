//On rattache div HTML
const divGallery = document.querySelector(".gallery");
let listeTravaux;
//Appel de l'API works
async function works() {
  const response = await fetch("http://localhost:5678/api/works");
  listeTravaux = await response.json();
  console.log(listeTravaux);
  afficheWorks();
}

function afficheWorks() {
  divGallery.innerHTML = "";
  // Entourer notre code avec une boucle for.
  // Cela permet de créer toutes les fiches produits de notre site.
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

// -------------------------------------- fenêtre modale ----------------------------------------
//Ouverture de la modale
const openModal = function () {
  document.querySelector(".modale").style.display = "block";
  afficheWorksMini();
};

document.querySelector(".btn-modifier2").addEventListener("click", openModal);

//Fermeture de la modale
//Permet la propagation de l'evenement vers les parents
const stopPropagation = function (event) {
  event.stopPropagation();
};

const closeModal = function () {
  document.querySelector(".modale").style.display = "none";
};

document.querySelector(".modale").addEventListener("click", closeModal);
document.querySelector(".btn-close").addEventListener("click", closeModal);
document
  .querySelector(".js-modal-stop")
  .addEventListener("click", stopPropagation);

// ------------------------------------------ Faire apparaître les projets ds Modale --------------------------------
function afficheWorksMini() {
  const editGallery = document.querySelector("#edit-gallery");
  editGallery.innerHTML = "";
  // Entourer notre code avec une boucle for.
  // Cela permet de créer toutes les fiches produits de notre site.
  for (let i = 0; i < listeTravaux.length; i++) {
    //Création des balises
    const projet = listeTravaux[i];

    const divElement = document.createElement("div");
    editGallery.appendChild(divElement);
    divElement.classList.add("premier-work");
    divElement.style.backgroundImage = `url(${projet.imageUrl})`;

    const divButtonElement = document.createElement("div");
    divElement.appendChild(divButtonElement);
    divButtonElement.classList.add("btn-work");

    const projectButtonElement = document.createElement("button");
    divButtonElement.appendChild(projectButtonElement);
    projectButtonElement.classList.add("btn-projet");

    const iconeEditer = document.createElement("i");
    projectButtonElement.appendChild(iconeEditer);
    iconeEditer.classList.add("fa-solid", "fa-arrows-up-down-left-right");
    iconeEditer.classList.add("icone-editer");

    const deleteButtonElement = document.createElement("button");
    divButtonElement.appendChild(deleteButtonElement);
    deleteButtonElement.classList.add("btn-delete");
    deleteButtonElement.addEventListener("click", (e) =>
      deletework(projet.id, e)
    );

    const iconeDelete = document.createElement("i");
    deleteButtonElement.appendChild(iconeDelete);
    iconeDelete.classList.add("fa-solid", "fa-trash-can", "fa-xs");
    iconeDelete.classList.add("icone-delete");

    const editButtonElement = document.createElement("button");
    divElement.appendChild(editButtonElement);
    editButtonElement.classList.add("btn-editer");
    editButtonElement.innerText = "éditer";
  }
}

async function deletework(id, event) {
  console.log(id);
  const confirmDelete = confirm(
    "Êtes-vous sûr de bien vouloir supprimer ce projet ?"
  );
  if (confirmDelete) {
    event.preventDefault();
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    const deleteResponse = await response.json();
    console.log(deleteResponse);
  }
  //si requête reussi
  if (response.status === 200) {
    works();
    afficheWorksMini();
  }
}

// ---------------------------    Affichage Modal version 2   ------------------------------------

const openModalV2 = function (e) {
  e.preventDefault();
  document.querySelector("#modal-delete-gallery").style.display = "none";
  document.querySelector("#modal-add-projet").style.display = "block";
};

document.querySelector("#btn-photo").addEventListener("click", openModalV2);

const btnReturn = function (e) {
  e.preventDefault();
  document.querySelector("#modal-delete-gallery").style.display = "block";
  document.querySelector("#modal-add-projet").style.display = "none";
};

document.querySelector(".btn-return").addEventListener("click", btnReturn);
document
  .querySelector(".js-modal-stop2")
  .addEventListener("click", stopPropagation);

// // ---------------------- upload image -------------------------------

const form = document.querySelector("#form-projet");

form.addEventListener("submit", function () {
  const imageElement = document.querySelector("#ajouter-img");
  const titleElement = document.querySelector("#title");
  const categoryElement = document.querySelector("#form-categorie");
});

// if (!imageElement.value || !titleElement.value || !categoryElement.value) {
//   return alert("Vous devez saisir une image, un titre et une categorie");
// }

// const reader = new FileReader(); //permeet de lire le contenu de fichier
// reader.addEventListener("load", () => {
//   uploadedImage = reader.result; //On stock l'image ds la var et on affihce le resultat
//   document.querySelector(
//     ".div-img"
//   ).style.backgroundImage = `url(${uploadedImage})`;
// });
// reader.readAsDataURL(this.files[0]);
// });

//  -----------------------------  Formulaire --------------------------------

// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   //creation des données du formulaire
//   const formData = new FormData(form);
// });

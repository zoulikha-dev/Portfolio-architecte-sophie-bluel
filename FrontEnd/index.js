//On rattache div HTML
const divGallery = document.querySelector(".gallery");
let listeTravaux;
let listeCategories;
//Appel de l'API works
async function works() {
  const response = await fetch("http://localhost:5678/api/works");
  listeTravaux = await response.json();
  console.log(listeTravaux);
  afficheWorks(listeTravaux);
}

function afficheWorks(projets) {
  divGallery.innerHTML = "";
  // Entourer notre code avec une boucle for.
  // Cela permet de créer toutes les fiches produits de notre site.
  for (let i = 0; i < projets.length; i++) {
    //Création des balises
    const projet = projets[i];

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
  listeCategories = await response.json();
  console.log(listeCategories);
  categoriesModale();

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
      console.log(travauxFiltres);
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

// ---------------------------------------------------- OUVERTURE DE LA MODALE ---------------------------------------------
const openModal = function () {
  document.querySelector(".modale").style.display = "block";
  afficheWorksMini();
};
//Permet la propagation de l'evenement vers les parents
const stopPropagation = function (event) {
  event.stopPropagation();
};
const closeModal = function () {
  document.querySelector(".modale").style.display = "none";
};
const btnClose = document.querySelectorAll(".btn-close");
btnClose.forEach(function (element) {
  element.addEventListener("click", closeModal);
});

document.querySelector(".btn-modifier2").addEventListener("click", openModal);
document
  .querySelector(".js-modal-stop")
  .addEventListener("click", stopPropagation);
document.querySelector(".modale").addEventListener("click", closeModal);

// ------------------------------------------ APPARITION DES PROJETS DE LA MODALE -------------------------------------------
function afficheWorksMini() {
  const editGallery = document.querySelector("#edit-gallery");
  editGallery.innerHTML = "";

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

  if (response.status === 200) {
    works();
    afficheWorksMini();
  }
}

// ---------------------------    Affichage Modal VERSION 2   ------------------------------------

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

// --------------------------------------------------- CREATION DU CHAMP SELECT CATEGORIE  ------------------------------------------

async function categoriesModale() {
  for (let index = 0; index < listeCategories.length; index++) {
    const category = listeCategories[index];

    const selectForm = document.querySelector("#form-categorie");

    const optionForm = document.createElement("option");
    optionForm.innerText = category.name;
    optionForm.value = category.id;
    selectForm.appendChild(optionForm);
  }
}

//-------------------------------------------------- FORMULAIRE ----------------------------------------------------

const imageElement = document.querySelector("#ajouter-img");
const titleElement = document.querySelector("#title");
const categoryElement = document.querySelector("#form-categorie");
const btnValider = document.querySelector("#btn-valider");
const msgErreur = document.querySelector(".message-erreur");
const msgOk = document.querySelector(".message-ok");

const form = document.querySelector("#form-projet");

form.addEventListener("change", function (e) {
  const ajoutImage = imageElement.value;
  const ajoutTitle = titleElement.value;
  const ajoutCategory = categoryElement.value;

  if (!ajoutImage || !ajoutTitle || !ajoutCategory) {
    btnValider.classList.add("btn-disabled");
    btnValider.classList.remove("btn-enabled");
  } else {
    btnValider.classList.add("btn-enabled");
    btnValider.classList.remove("btn-disabled");
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  //On les stock dans d'autre variable pour cibler la valeur saisie par l'utilisateur ou le fichier chargé
  const ajoutImage = imageElement.value;
  const ajoutTitle = titleElement.value;
  const ajoutCategory = categoryElement.value;

  if (!ajoutImage || !ajoutTitle || !ajoutCategory) {
    return (msgErreur.style.visibility = "visible");
  } else {
    msgErreur.style.visibility = "hidden";
  }

  const formData = new FormData(form);
  console.log(formData);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    body: formData,
  });
  if (response.status === 201) {
    closeModal();
    works();
  }
});

// ----------------------------------------------- L'image s'affiche Dans le champ prévu à cet effet -----------------------------------------

// const iconeImg = document.querySelector(".ajouter-img");
const imageInput = document.querySelector("#ajouter-img");
let uploadedImage = "";

imageInput.addEventListener("change", function () {
  const reader = new FileReader(); //permeet de lire le contenu de fichier
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    document.querySelector(
      ".div-img"
    ).style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(this.files[0]);
});

// Récupéreation des données

const fetchPromise = "http://localhost:3000/api/teddies";

// Récupération de l'id

const params = new URL(document.location).searchParams;
const id = params.get("id");

// Convertisseur des prix en €

const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

// Indice de quantité du panier

document.getElementById("shopping_quantity").innerHTML += ` <span class="fw-bold ">(${localStorage.length})</span>`;

// Transformation de l'id récupéré en object

function transformIdInObject(id) {
  fetch(fetchPromise)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i in data) {
        if (id == data[i]._id) {

          // Création du produit détaillé

          document.getElementById("product_detail").innerHTML = `    
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text text-success">${euro.format(data[i].price / 100)}</p>
          <img class="card-img" src="${data[i].imageUrl}">
          <div class="mt-3">
            <h6 class="text-secondary">Description :</h6>
            <p class="card-text">${data[i].description}</p>
          </div>
          `;

          // Création de la liste de personnalisation

          document.getElementById("product_custom").innerHTML = `
            <h6 class="text-secondary">
              <label for="custom">Choix de la couleur :</label>
            </h6>
            <select id="custom" name="custom"></select>
          `;

          const customs = data[i].colors;
          for (let custom of customs) {
            document.getElementById("custom").innerHTML += `
            <option value="${custom}">${custom}</option>
            `;
          };

          // Création du choix de la quantité

          for (let quantity = 1; quantity <= 10; quantity++) {
            document.getElementById("quantity").innerHTML += `
            <option value="${quantity}">${quantity}</option>
            `;
          };
        }
      }
    })
    .catch((err) => {
      console.log("Erreur fonction transformIdInObject()");
    });
}

transformIdInObject(id);

// Ajout d'un produit sur le LocalStorage

const addButton = document.getElementById("add_product");
let getQuantity = document.getElementById("quantity");
addButton.addEventListener('click', (event) => {
  localStorage.setItem(id, getQuantity.value);
  if (getQuantity.value > 1) {
    alert(`Vos ${getQuantity.value} produits ont bien été ajouté à votre panier !`)
  } else {
    alert("Votre produit a bien été ajouté à votre panier !")
  }
});
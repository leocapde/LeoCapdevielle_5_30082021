// Récupéreation des données

const fetchPromise = fetch("http://localhost:3000/api/teddies");

// Convertisseur des prix en €

const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

// Indice de quantité du panier

document.getElementById("shopping_quantity").innerHTML += ` <span class="font-weight-bold ">${localStorage.length}</span>`;

// Création de la liste des produits ajoutés au panier

function createShoppingList() {
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const shoppingList = document.getElementById("shopping_list");
      let totalShopping = 0;
      // let productQuantity = 0;

      for (let obj of data) {
        for (let key in localStorage) {
          if (obj._id == key) {
            let productQuantity = localStorage.getItem(obj._id);

            // Création de la carte produit

            let newDiv = document.createElement("div");
            newDiv.id = `${obj._id}`;
            newDiv.classList.add(
              "row",
              "m-3",
              "justify-content-center",
              "align-items-center",
            );
            shoppingList.appendChild(newDiv);

            // Ajout du contenu de la carte produit

            document.getElementById(`${obj._id}`).innerHTML = 
            `
            <div class="col-12 col-md-auto mb-3 mb-md-0">
              <h6 class="mt-3 text-secondary">Quantité :</h6>
              <p>${productQuantity}</p>
            </div>
            <div class="col-12 col-md-6 card shadow p-3 mb-3 bg-white rounded">
              <div class="row align-items-center">
                <div class="col-7 card-body">    
                  <h5 class="card-title">${obj.name}</h5>
                  <p class="card-text text-success">${euro.format(obj.price / 100)}</p>
                </div>
                <div class="col-5">
                  <img class="card-img-top" src="${obj.imageUrl}">
                </div>
              </div>
            </div>
            <div class="col-12 col-md-auto">
              <h6 class="mt-3 text-secondary">Prix total :</h6>
              <p class="text-success font-weight-bold">${euro.format(obj.price / 100 * productQuantity)}</p>
            </div>
            `;

            totalShopping += obj.price * productQuantity;
          } 
        }
      }
      if (shoppingList.hasChildNodes() == false) {
        shoppingList.innerHTML = 
        `
        <p class="mt-5 text-center">Votre panier est actuellement vide ...</p>
        `;
      }

      // Prix total

      document.getElementById("total_shopping").innerHTML = 
      `
      <div class="row mt-5 justify-content-center h5">
        <p class="col-12 col-md-auto text-secondary">Total du panier :</p>
        <p class="col-12 col-md-auto text-success font-weight-bold font-size-1.5">${euro.format(totalShopping / 100)}</p>
      </div>
      `;
    })
    .catch((err) => {
      console.log("Erreur fonction createShoppingList()");
    });
}

createShoppingList();

// Vider le panier

const trashButton = document.getElementById("trash");
trashButton.addEventListener('click', function(event) {
  localStorage.clear();
  if (confirm("Êtes-vous sur de vouloir vider votre panier ?")) {
    location.reload();
  }
});
// Récupéreation des données

const fetchPromise = fetch("http://localhost:3000/api/teddies");

// Vider le panier

const trashButton = document.getElementById("trash");
trashButton.addEventListener('click', function(event) {
  localStorage.clear();
  if (confirm("Êtes-vous sur de vouloir vider votre panier ?")) {
    location.reload();
  }
});

// Création de la liste des produits ajoutés au panier

function createShoppingList() {
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const shoppingList = document.getElementById("shopping_list");
      const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
      });
      let total_price = 0;

      for (let obj of data) {
        for (let key in localStorage) {
          if (obj._id == key) {

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
            <div class="col-12 col-md-auto mb-3">
              <h6 class="text-secondary">
              <label for="quantity">Quantité :</label>
              </h6>
              <select id="quantity_${obj._id}" name="quantity"></select>
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
              <p class="text-success font-weight-bold">${euro.format(obj.price / 100)}</p>
            </div>
            `;

            for (let quantity = 1; quantity <= 10; quantity++) {
              document.getElementById(`quantity_${obj._id}`).innerHTML += `
              <option value="${quantity}">${quantity}</option>
              `;
            };

            total_price += obj.price;
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
        <p class="col-12 col-md-auto text-success font-weight-bold font-size-1.5">${euro.format(total_price / 100)}</p>
      </div>
      `;
    })
    .catch((err) => {
      console.log("Erreur fonction createShoppingList()");
    });
}

createShoppingList();
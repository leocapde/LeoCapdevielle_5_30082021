// Récupéreation des données

const fetchPromise = "http://localhost:3000/api/teddies";
const fetchPost = "http://localhost:3000/api/teddies/order";

// Convertisseur des prix en €

const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

// Indice de quantité du panier

document.getElementById("shopping_quantity").innerHTML += ` <span class="fw-bold ">(${localStorage.length})</span>`;

// Création des objets

let products = new Array();
let contact;

function createContact() {
  contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value
  }
};

// Création de la liste des produits ajoutés au panier

function createShoppingList() {
  fetch(fetchPromise)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const shoppingList = document.getElementById("shopping_list");
      let totalShopping = 0;

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
            <div class="col-12 col-md-auto">
              <h6 class="mt-3 text-secondary">Quantité :</h6>
              <p>${productQuantity}</p>
            </div>
            <div class="col-12 col-md-6 card shadow p-3 bg-white rounded">
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
              <p class="text-success fw-bold">${euro.format(obj.price / 100 * productQuantity)}</p>
            </div>
            `;

            totalShopping += obj.price * productQuantity;

            // Ajout du contenu dans l'objet products

            products.push(
              obj._id
            //   {
            //   _id: obj._id,
            //   name: obj.name,
            //   price: obj.price,
            //   imageUrl: obj.imageUrl,
            //   description: obj.description,
            //   colors: obj.colors,
            //   quantity: productQuantity,
            //   total_price: obj.price * productQuantity
            // }
            );
          } 
        }
      }
      if (!shoppingList.hasChildNodes()) {
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
        <p class="col-12 col-md-auto text-success fw-bold font-size-1.5">${euro.format(totalShopping / 100)}</p>
      </div>
      `;
    })
    .catch((err) => {
      console.log("Erreur fonction createShoppingList()");
    });
}

createShoppingList();

// Passer au formulaire de commande

const validationButton = document.getElementById("validation");
validationButton.addEventListener('click', (event) => {
  if (localStorage.length == 0) {
    alert("Votre panier est vide ...")
  } else {
    if (confirm("Êtes-vous sûr de vouloir passer la commande ?")) {
      document.getElementById("validation_shopping").innerHTML = 
      `
      <h3 class="my-3">Vos informations personnelles</h3>
      <form id="validation_form">
          <div class="mt-3">
              <h6 class="text-secondary mb-0 text-start">
                  <label for="lastName">Nom :</label>
              </h6>
              <input class="w-100" type="text" id="lastName" name="lastName" required>
          </div>
          <div class="mt-3">
              <h6 class="text-secondary mb-0 text-start">
                  <label for="firstName">Prénom :</label>
              </h6>
              <input class="w-100" type="text" id="firstName" name="firstName" required>
          </div>
          <div class="mt-3">
              <h6 class="text-secondary mb-0 text-start">
                  <label for="address">Adresse :</label>
              </h6>
              <input class="w-100" type="text" id="address" name="address" required>
          </div>
          <div class="mt-3">
              <h6 class="text-secondary mb-0 text-start">
                  <label for="city">Ville :</label>
              </h6>
              <input class="w-100" type="text" id="city" name="city" required>
          </div>
          <div class="mt-3">
              <h6 class="text-secondary mb-0 text-start">
                  <label for="email">Email :</label>
              </h6>
              <input class="w-100" type="email" id="email" name="email" required>
          </div>
          <div class="mt-4 mb-3">
              <button id="confirmation" class="btn btn-success" type="submit">Confirmer la commande</button>
          </div>
      </form>
      `;

      // Création de l'objet contact

      const confirmationButton = document.getElementById("validation_form");
      confirmationButton.addEventListener('submit', (event) => {
        event.preventDefault(); // Permet de ne pas envoyer le formulaire
        if (confirm("Êtes-vous sûr de vouloir envoyer le formulaire ?")) {
        createContact();
        sendCommand();
        }
      });
    }
  }
})

// Envoie de la commande 

function sendCommand() {
  fetch(fetchPost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contact, products
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // localStorage.clear();
    // localStorage.setItem("products", products);
    // localStorage.setItem("contact", contact);

    // renvoyer vers URL/orderId
    // location.href = "validation.html?id="+data.orderId;

    console.log(data.orderId);
  })
  .catch((err) => {
    console.log("Erreur fonction sendCommand()");
  });
}

// Vider le panier

const trashButton = document.getElementById("trash");
trashButton.addEventListener('click', (event) => {
  if (confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
    localStorage.clear();
    location.reload();
  }
});
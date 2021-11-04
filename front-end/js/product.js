// Récupération de l'id

const id = url.get("id");

// Création du produit détaillé à partir de l'id récupéré

function createDetailedProduct(id) {
  fetch(fetchPromise)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let obj of data) {
        if (id == obj._id) {

          // Création du produit détaillé

          document.getElementById("product_detail").innerHTML = `    
          <h5 class="card-title">${obj.name}</h5>
          <p class="card-text text-success">${euro.format(obj.price / 100)}</p>
          <img class="card-img" src="${obj.imageUrl}" alt="${obj.name}">
          <div class="mt-3">
            <h6 class="text-secondary">Description :</h6>
            <p class="card-text">${obj.description}</p>
          </div>
          `;

          // Création de la liste de personnalisation

          document.getElementById("product_custom").innerHTML = `
            <h6 class="text-secondary">
              <label for="custom">Choix de la couleur :</label>
            </h6>
            <select id="custom" name="custom"></select>
          `;

          const customs = obj.colors;
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
      console.log("Erreur fonction createDetailedProduct()");
    });
}

createDetailedProduct(id);

// Ajout du produit dans le panier (sur le LocalStorage)

let getQuantity = document.getElementById("quantity");
const addButton = document.getElementById("add_product");
addButton.addEventListener('click', (event) => {
  if (localStorage.getItem(id)) {
    let storageQuantity = localStorage.getItem(id);
    let totalQuantity = parseInt(storageQuantity, 10) + parseInt(getQuantity.value, 10);

    if (confirm(`Vous avez déjà ce produit en ${storageQuantity} exemplaires dans votre panier. Souhaitez vous ajouter ces ${getQuantity.value} nouveaux examplaires ?`)) {
      localStorage.setItem(id, totalQuantity);
      location.href = "shopping.html";
    } 
  } else {
      alert(`Vos ${getQuantity.value} produits ont bien été ajouté à votre panier !`)
      localStorage.setItem(id, getQuantity.value);
      location.href = "shopping.html";
    }
});
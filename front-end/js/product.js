// Récupéreation des données

const fetchPromise = fetch("http://localhost:3000/api/teddies");

// Récupération de l'id

const params = new URL(document.location).searchParams;
const id = params.get("id");

// Transformation de l'id récupéré en object

function transformIdInObject(id) {
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i in data) {
        if (id == data[i]._id) {

          const euro = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
          });

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
          <div>
            <h6 class="text-secondary">
              <label for="custom">Personalistion :</label>
            </h6>
            <select id="custom" name="custom">
              <option value="">-- Choisissez la couleur --</option>
            </select>
          </div>
          `;

          const customs = data[i].colors;
          for (let custom of customs) {
            document.getElementById("custom").innerHTML += `
            <option value="${custom}">${custom}</option>
            `;
          };

          // Création du choix de la quantité

          document.getElementById("product_quantity").innerHTML = `
          <div>
            <h6 class="text-secondary">
              <label for="quantity">Quantité :</label>
            </h6>
            <select id="quantity" name="quantity"></select>
          </div>
          `;

          for (let quantity = 1; quantity <= 10; quantity++) {
            document.getElementById("quantity").innerHTML += `
            <option value="${quantity}">${quantity}</option>
            `;
          };

          // Prix total

          let total_quantity = 1;
          // document.getElementById("quantity").addEventListener('change', (event) => {
          //   total_quantity = `${event.target.value}`;
          //   return total_quantity;
          // })

          // console.log(total_quantity);

          document.getElementById("product_total").innerHTML = `
          <div>
            <h6 class="text-secondary">Prix total :</h6>
            <p class="text-success font-weight-bold">${euro.format(data[i].price / 100 * total_quantity)}</p>
          </div>
          `;
        }
      }
    })
    .catch((err) => {
      console.log("Erreur fonction transformIdInObject()");
    });
}

transformIdInObject(id);

// Compteur de clicks du boutton "ajouter au panier"

let addClicks = 0;
const addButton = document.getElementById("add_product");

addButton.addEventListener('click', function(event) {
  addClicks += 1;
})

// Ajout d'un produit sur le LocalStorage

addButton.addEventListener('click', (event) => {
  localStorage.setItem(id, addClicks);
  alert("Votre produit a bien été ajouté à votre panier !")
});
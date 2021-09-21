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

          // Création du produit détaillé

          const euro = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
          });
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

          // Ajout des différentes options de personalisation

          const customs = data[i].colors;
          for (let custom of customs) {
            document.getElementById("custom").innerHTML += `
            <option value="${custom}">${custom}</option>
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
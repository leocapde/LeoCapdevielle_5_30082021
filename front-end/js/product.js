// Récupéreation des données

const fetchPromise = fetch("http://localhost:3000/api/teddies");

// Récupération de l'id

let params = new URL(document.location).searchParams;
let id = params.get("id");

// Transformation de l'id récupéré en object

function transformIdInObject(id) {
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i in data) {
        if (id == data[i]._id) {
          document.querySelector(".product_detail").innerHTML = `
          <div class="row">
            <div class="col-8 card-body">    
             <h5 class="card-title">${data[i].name}</h5>
             <p class="card-text text-success">${data[i].price / 100} €</p>
             <p class="card-text">${data[i].description}</p>
            </div>
            <div class="col-4">
             <img class="card-img-top" src="${data[i].imageUrl}">
            </div>
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

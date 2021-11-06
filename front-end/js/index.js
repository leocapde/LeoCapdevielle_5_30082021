// Fonction de création de la liste des produits

function createProductList() {
  fetch(fetchPromise)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let obj of data) {

        // Création d'une carte produit
    
        let newDiv = document.createElement("div");
        newDiv.id = obj._id;
        newDiv.classList.add(
          "col-12",
          "col-xl-6",
        );
        document.getElementById("product_list").appendChild(newDiv);
    
        // Ajout du contenu de la carte produit
    
        document.getElementById(obj._id).innerHTML = 
          `
          <div class="card shadow p-3 mb-3 bg-white rounded">
            <div class="row align-items-center">
              <div class="col-7 card-body">    
                <h5 class="card-title">${obj.name}</h5>
                <p class="card-text text-success">${euro.format(obj.price / 100)}</p>
                <a class="btn btn-primary" href="product.html?id=${obj._id}" class="streched-link" >En savoir plus</a>
              </div>
              <div class="col-5">
                <img class="card-img-top" src="${obj.imageUrl}" alt="${obj.name}">
              </div>
            </div>
          </div>
          `;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

createProductList();

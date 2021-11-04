// Récupération de l'orderId

const orderId = url.get("orderId");

// Affichage du numéro de commande

document.getElementById("validation_orderId").innerHTML = 
`
<p><span class="fw-bold">Numéro de commande :</span> n°${orderId}</p>
`;

// Création du récapitulatif de facturation

function createValidationContactList() {
  let contactJSON = localStorage.getItem("contact");
  let contact = JSON.parse(contactJSON);

  document.getElementById("validation_contact").innerHTML = 
  `
  <p class="mb-1"><span class="fw-bold">Nom :</span> ${contact.lastName}</p>
  <p class="mb-1"><span class="fw-bold">Prénom :</span> ${contact.firstName}</p>
  <p class="mb-1"><span class="fw-bold">Addresse :</span> ${contact.address}</p>
  <p class="mb-1"><span class="fw-bold">Ville :</span> ${contact.city}</p>
  <p class="mb-1"><span class="fw-bold">Email :</span> ${contact.email}</p>
  `;
}

createValidationContactList();

// Création de la liste récapitulative des produits achetés

function createValidationProductsList() {
  fetch(fetchPromise)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const validationProductsList = document.getElementById("validation_products");
    let totalShopping = 0;

    for (let obj of data) {
      for (let key in localStorage) {
        if (obj._id == key) {
          let productQuantity = localStorage.getItem(obj._id);

          // Création de la carte produit

          let newDiv = document.createElement("div");
          newDiv.id = obj._id;
          newDiv.classList.add(
            "col-12",
            "col-xl-6",
          );
          validationProductsList.appendChild(newDiv);

          // Ajout du contenu de la carte produit

          document.getElementById(`${obj._id}`).innerHTML = 
          `
          <div class="card shadow p-3 mb-3 bg-white rounded">
            <div class="row align-items-center">
              <div class="col-7 card-body">    
                <h5 class="card-title">${obj.name}</h5>
                <p>Quantité : ${productQuantity}</p>
                <p class="text-success">Prix total : ${euro.format(obj.price / 100 * productQuantity)}</p>
              </div>
              <div class="col-5">
                <img class="card-img-top" src="${obj.imageUrl}" alt="${obj.name}">
              </div>
            </div>
          </div>
          `;

          totalShopping += obj.price * productQuantity;
        } 
      }
    }

    // Affichage du prix total de la commande

    document.getElementById("totalShopping").innerHTML = 
    `
    <div class="row mt-5 justify-content-center h5">
      <p class="col-12 col-md-auto text-secondary">Prix total :</p>
      <p class="col-12 col-md-auto text-success fw-bold font-size-1.5">${euro.format(totalShopping / 100)}</p>
    </div>
    `;
    localStorage.clear(); // Vide le localStorage après avoir chargé et affiché la page
  })
  .catch((err) => {
    console.log("Erreur fonction createValidationProductsList()");
  });
};

createValidationProductsList();
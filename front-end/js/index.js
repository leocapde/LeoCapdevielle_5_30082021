// Récupéreation des données
  
function askData(i) {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      document.getElementById("product_" + [i]).innerHTML = 
      `
      ${data[i].name} <br>
      ${data[i].price/100} $ <br>
      <img src="${data[i].imageUrl}"> <br>
      ${data[i].description} 
      `;
    })
    .catch(function(err) {
      console.log("Erreur description")
    })
}

// Création de la liste des produits

function createProductList() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(data) {
      for (let i in data) {
        let newDiv = document.createElement("div");
        newDiv.id = "product_" + [i];
        newDiv.classList.add("col-12", "col-xl-6", "my-1", "p-3", "border", "border-primary", "rounded", "product");
        document.querySelector(".product_list").appendChild(newDiv);
        askData(i);
      }
    })
    .catch(function(err) {
      console.log("Erreur data")
    })
}

createProductList();

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
      ${data[i].description} <br>
      <a href="product.html?id=${data[i]._id}" class="streched-link" >En savoir plus</a>
      `;
    })
    .catch(function(err) {
      console.log("Erreur data")
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
        newDiv.classList.add("col-12", "col-xl-6", "my-1", "p-3", "border", "border-primary", "rounded");
        document.querySelector(".product_list").appendChild(newDiv);
        askData(i);
      }
    })
    .catch(function(err) {
      console.log("Erreur product list")
    })
}

createProductList();

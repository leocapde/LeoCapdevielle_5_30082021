// Récupération de l'id

let params = new URL(document.location).searchParams;
let id = params.get("id");

// Transformation de l'id récupéré en object

function transformIdInObject(id) {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      for (let i in data) {
        if (id == data[i]._id) {
          document.querySelector(".product_detail").innerHTML = 
          `
          ${data[i].name} <br>
          ${data[i].price / 100} $ <br>
          <img src="${data[i].imageUrl}"> <br>
          ${data[i].description}
          `;
        }
      }
    })
    .catch(function(err) {
        console.log("Erreur transform")
    });
}

transformIdInObject(id);
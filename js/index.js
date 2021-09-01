// Récupéreation des données

function askDataName(i) {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      let newPara = document.createElement("p");
      newPara.classList.add("name");
      document.getElementById("product_" + [i]).appendChild(newPara).textContent =
        data[i].name;
    })
    .catch(function(err) {
      console.log("Erreur name")
    })
}

function askDataPrice(i) {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      let newPara = document.createElement("p");
      newPara.classList.add("price");
      document.getElementById("product_" + [i]).appendChild(newPara).textContent =
        data[i].price/100 + " $";
    })
    .catch(function(err) {
      console.log("Erreur price")
    })
}

function askDataImage(i) {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      let newImage = new Image();
      newImage.classList.add("image");
      document.getElementById("product_" + [i]).appendChild(newImage).src = data[i].imageUrl;
    })
    .catch(function(err) {
      console.log("Erreur image")
    })
}

function askDataDescription(i) {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      let newPara = document.createElement("p");
      newPara.classList.add("description");
      document.getElementById("product_" + [i]).appendChild(newPara).textContent =
        data[i].description;
    })
    .catch(function(err) {
      console.log("Erreur description")
    })
}

// Regroupement de toutes les données

function askData() {
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
        newDiv.classList.add("product");
        document.querySelector(".procduct_list").appendChild(newDiv);
        askDataName(i);
        askDataPrice(i);
        askDataImage(i);
        askDataDescription(i);
      }
    })
    .catch(function(err) {
      console.log("Erreur data")
    })
}

askData();

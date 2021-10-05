// Récupéreation des données

const fetchPromise = fetch("http://localhost:3000/api/teddies");

// Vider le LocalStorage

const trashButton = document.getElementById("trash");
trashButton.addEventListener('click', function(event) {
  localStorage.clear();
});

// Création de la liste des produits ajoutés au panier

function createShoppingList() {
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let localStorageLenght = localStorage.length;
      for (let obj of data) {
        // console.log(obj._id);
        for (let i in localStorageLenght) {
          let key = localStorage.key(i);
          // console.log(localStorage[key(i)]);
          console.log(obj._id);
          console.log("Bonjour !");
          
        }
      }
      console.log(localStorage);
    })
    .catch((err) => {
      console.log("Erreur fonction createShoppingList()");
    });
}

createShoppingList();
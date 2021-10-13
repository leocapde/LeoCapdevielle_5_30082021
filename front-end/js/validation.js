// Récupéreation des données

const fetchPromise = "http://localhost:3000/api/teddies";

// Convertisseur des prix en €

const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

// Indice de quantité du panier

document.getElementById("shopping_quantity").innerHTML += ` <span class="fw-bold ">(${localStorage.length})</span>`;
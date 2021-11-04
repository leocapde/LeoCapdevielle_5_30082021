// Récupéreation des données

const fetchPromise = "http://localhost:3000/api/teddies";
const fetchPost = "http://localhost:3000/api/teddies/order";

// Récupération de l'URL

const url = new URL(document.location).searchParams;

// Convertisseur des prix en €

const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  });
  
// Indice de quantité du panier

if (document.getElementById("nav-shopping")) {
  document.getElementById("nav-shopping").innerHTML += ` <span class="fw-bold ">(${localStorage.length})</span>`;
}
// Base URL for the Pokemon API
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

// Get the container to display Pokemon
const pokemonContainer = document.getElementById('pokemon-container');

// Fetch Pokemon from API
async function fetchPokemon() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pokemonList = data.results;
    displayPokemon(pokemonList);
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
  }
}

// Fetch details for each Pokemon to get its sprite
async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  const data = await response.json();
  return {
    name: data.name,
    sprite: data.sprites.other['official-artwork'].front_default,
  };
}

// Display Pokemon sprites on the page
async function displayPokemon(pokemonList) {
  for (const pokemon of pokemonList) {
    const details = await fetchPokemonDetails(pokemon.url);
    createPokemonCard(details);
  }
}

// Create a card for each Pokemon
function createPokemonCard(pokemon) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');

  pokemonCard.innerHTML = `
    <img src="${pokemon.sprite}" alt="${pokemon.name}" />
    <p class="pokemon-name">${capitalize(pokemon.name)}</p>`;

  pokemonContainer.appendChild(pokemonCard);
}

// Capitalize the first letter of the Pokemon's name
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initial fetch when the page loads
document.addEventListener('DOMContentLoaded', fetchPokemon);
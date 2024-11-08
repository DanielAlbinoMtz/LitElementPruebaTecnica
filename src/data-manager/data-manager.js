import fetchData from '../data-provider/data-provider';

class PokemonManager {
    constructor() {
      this.pokemon = [];
      this.hasFetched = false;
    }
  
    async fetchPokemon() {
      if (this.hasFetched) return this.pokemon; // Devuelve directamente si ya se ha hecho la llamada
      this.pokemon = await fetchData();
      this.hasFetched = true;
      return this.pokemon;
    }
  }
  
  export const pokemonManager = new PokemonManager();
  
  
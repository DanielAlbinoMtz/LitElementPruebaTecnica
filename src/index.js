import { LitElement, html } from 'lit';
import { PokemonList } from './pages/user-list';
import { PokemonEvolutions } from './pages/pokemon-evolutions';
import { PokemonEditForm } from './pages/pokemon-edit-form';
import { pokemonManager } from './data-manager/data-manager';

class MyElement extends LitElement {
  static properties = {
    pokemon: { type: Array },
    showingEvolutions: { type: Boolean },
    currentPokemon: { type: Object },
    isEditing: { type: Boolean },
    evolutionToEdit: { type: Object }
  };

  constructor() {
    super();
    this.pokemon = [];
    this.showingEvolutions = false;
    this.isEditing = false;
    this.currentPokemon = {};
    this.evolutionToEdit = null;
  }

  async firstUpdated() {
    this.pokemon = await pokemonManager.fetchPokemon();
  }

  render() {
    return html`
      ${this.showingEvolutions
        ? this.isEditing
          ? html`<pokemon-edit-form .evolution="${this.evolutionToEdit}" @save-edit="${this._saveEdit}" @cancel-edit="${this._cancelEdit}"></pokemon-edit-form>`
          : html`<pokemon-evolutions .evolutions="${this.currentPokemon.evolutions || []}" @go-back="${this._goBackToList}" @edit-evolution="${this._editEvolution}"></pokemon-evolutions>`
        : html`<poke-list .pokemon="${this.pokemon}" @show-evolutions="${this._showEvolutions}"></poke-list>`
      }
    `;
  }
  
  _showEvolutions(e) {
    this.currentPokemon = e.detail.pokemon;
    this.showingEvolutions = true;
    this.requestUpdate();
  }
  
  _goBackToList() {
    this.showingEvolutions = false;
    this.requestUpdate();
  }

  _editEvolution(e) {
    this.evolutionToEdit = e.detail.evolution;
    this.isEditing = true;
  }
  
  _saveEdit(e) {
    const editedEvolution = e.detail.evolution;
    // Actualiza la evolución en `currentPokemon`
    const index = this.currentPokemon.evolutions.findIndex(ev => ev.name === editedEvolution.name);
    if (index !== -1) {
      this.currentPokemon.evolutions[index] = editedEvolution;
    }
    this.isEditing = false;
  }

  _cancelEdit() {
    this.isEditing = false;
  }
  
}


customElements.define('my-element', MyElement);
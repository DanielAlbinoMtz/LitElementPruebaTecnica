import { LitElement, html, css } from 'lit';

export class PokemonList extends LitElement {
  static properties = {
    pokemon: { type: Array },
  };

  static styles = css`
  .pokemon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
  }

  .pokemon-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    width: 100%;
    max-width: 1200px;
    justify-items: center;
    padding-top: 20px;
  }

  .card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }

  .card-img-top {
    width: 100%;
    height: 200px;  /* Ajusta el tamaño según sea necesario */
    object-fit: contain;  /* Hace que la imagen se ajuste sin cortarse */
    object-position: center;  /* Centra la imagen dentro del contenedor */
  }

  .card-body {
    padding: 15px;
  }

  .card-title {
    font-size: 1.25rem;
    margin-bottom: 10px;
    color: #333;
  }

  .card-text {
    font-size: 1rem;
    color: #666;
    margin-bottom: 15px;
  }

  .btn-primary {
    display: inline-block;
    padding: 10px 15px;
    color: #fff;
    background-color: #007bff;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  /* Responsividad para pantallas pequeñas */
  @media (max-width: 768px) {
    .pokemon-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      padding: 10px;
    }

    .card {
      max-width: 100%;
    }
  }
`;



  constructor() {
    super();
    this.pokemon = []; // Aquí cargamos los datos de los Pokémon
  }

  render() {
    return html`
      <div class="pokemon-container">
        ${this.pokemon.length === 0
          ? html`<p>No hay pokemons para mostrar.</p>`
          : html`
              <div class="pokemon-grid">
                ${this.pokemon.pokemon.map(pokemon =>
                  html`
                    <div class="card">
                      <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
                      <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">${pokemon.type}</p>
                        <a href="#" class="btn btn-primary" @click="${() => this._showEvolutions(pokemon)}">Detalles</a>
                      </div>
                    </div>
                  `)}
              </div>
            `
        }
      </div>
    `;
  }

  _showEvolutions(pokemon) {
    this.dispatchEvent(new CustomEvent('show-evolutions', {
      detail: { pokemon },
      bubbles: true,
      composed: true
    }));
  }
  

}

customElements.define('poke-list', PokemonList);

import { LitElement, html, css } from "lit";

export class PokemonEvolutions extends LitElement {
  static properties = {
    evolutions: { type: Array },
  };

  static styles = css`
  .evolutions-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  .evolution-grid {
    display: flex;
    /* flex-wrap: wrap; */
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
    max-width: 1000px; /* Aumenta el ancho máximo del contenedor */
  }

  .evolution-card {
    width: calc(50% - 20px); /* Tarjetas más grandes ocupando el 50% en pantallas grandes */
    max-width: 400px; /* Aumenta el ancho máximo para pantallas grandes */
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px; /* Mayor espacio dentro de la tarjeta */
  }

  .evolution-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }

  .evolution-card h5 {
    font-size: 1.4rem; /* Aumenta el tamaño del texto */
    margin: 10px 0 5px;
  }

  .evolution-card p {
    font-size: 1.1rem; /* Aumenta el tamaño del texto */
    color: #666;
  }

  .evolution-card button {
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    padding: 10px 20px; /* Botón más grande */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .evolution-card button:hover {
    background-color: #0056b3;
  }

  @media (min-width: 1024px) {
    /* En pantallas aún más grandes, las tarjetas serán aún más grandes */
    .evolution-card {
      width: calc(80% - 20px);
      max-width: 500px;
      padding: 25px;
    }

    .evolution-card img {
      height: 250px;
    }

    .evolution-card h5 {
      font-size: 1.6rem;
    }

    .evolution-card p {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    /* Para pantallas pequeñas */
    .evolution-card {
      width: 100%;
      max-width: none;
    }

    .evolution-grid{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        /* margin-top: 20px;
        max-width: 1000px; */
    }
  }
`;



  constructor() {
    super();
    this.evolutions = [];
  }

  render() {
    return html`
      <div class="evolutions-container">
        <button @click="${this._goBack}">Volver</button>
        ${this.evolutions.length === 0
          ? html`<p>No hay evoluciones disponibles.</p>`
          : html`
              <div class="evolution-grid">
                ${this.evolutions.map(
                  (evolution) => html`
                    <div class="evolution-card">
                      <img src="${evolution.image}" alt="${evolution.name}" />
                      <h5>${evolution.name}</h5>
                      <p>${evolution.type}</p>
                      <button @click="${() => this._editEvolution(evolution)}">
                        Editar
                      </button>
                    </div>
                  `
                )}
              </div>
            `}
      </div>
    `;
  }

  _goBack() {
    console.log("volver");
    this.dispatchEvent(
      new CustomEvent("go-back", {
        bubbles: true,
        composed: true,
      })
    );
  }

  _editEvolution(evolution) {
    this.dispatchEvent(
      new CustomEvent("edit-evolution", {
        detail: { evolution },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("pokemon-evolutions", PokemonEvolutions);

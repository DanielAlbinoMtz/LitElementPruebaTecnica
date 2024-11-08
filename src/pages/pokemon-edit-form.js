import { LitElement, html, css } from 'lit';

export class PokemonEditForm extends LitElement {
  static properties = {
    evolution: { type: Object } // Evolución a editar
  };

  static styles = css`
  .edit-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .edit-form h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #333;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;
    font-size: 1rem;
    color: #555;
  }

  input[type="text"] {
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
    box-sizing: border-box;
    width: 100%;
    transition: border-color 0.3s;
  }

  input[type="text"]:focus {
    border-color: #007bff;
    outline: none;
  }

  button {
    width: 100%;
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }

  button:first-of-type {
    background-color: #007bff;
  }

  button:first-of-type:hover {
    background-color: #0056b3;
  }

  button:last-of-type {
    background-color: #dc3545;
  }

  button:last-of-type:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    .edit-form {
      width: 90%;
    }

    button {
      padding: 12px;
      font-size: 1.1rem;
    }
  }
`;


  constructor() {
    super();
    this.evolution = {};
  }

  _handleSave() {
    this.dispatchEvent(new CustomEvent('save-edit', {
      detail: { evolution: this.evolution },
      bubbles: true,
      composed: true
    }));
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel-edit', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="edit-form">
        <h3>Editar Evolución</h3>
        <label>Nombre: <input type="text" .value="${this.evolution.name}" @input="${e => this.evolution.name = e.target.value}"></label>
        <label>Tipo: <input type="text" .value="${this.evolution.type}" @input="${e => this.evolution.type = e.target.value}"></label>
        <label>Imagen: <input type="text" .value="${this.evolution.image}" @input="${e => this.evolution.image = e.target.value}"></label>
        <button @click="${this._handleSave}">Guardar</button>
        <button @click="${this._handleCancel}">Cancelar</button>
      </div>
    `;
  }
}

customElements.define('pokemon-edit-form', PokemonEditForm);

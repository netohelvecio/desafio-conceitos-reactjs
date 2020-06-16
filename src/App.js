import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        console.log(response.data);
        setRepositories(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div className="container">
      <h1>Criar repósitorio</h1>

      <form>
        <input type="text" placeholder="URL do repósitorio"/>

        <input type="text" placeholder="Titúlo do repósitorio"/>

        <span>Separar tecnlogias por virgúlas</span>
        <input type="text" placeholder="Teconlogias utilizadas"/>

        <button type="submit" onClick={handleAddRepository}>Adicionar</button>
      </form>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <span>{repository.title}</span>

            <p>{repository.techs.join(', ')}.</p>

            <div>
              <a href={repository.url}>Link para repósitorio</a>

              <button onClick={() => handleRemoveRepository(1)}>
              Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;

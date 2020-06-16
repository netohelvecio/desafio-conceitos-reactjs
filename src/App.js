import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [])

  async function handleAddRepository(e) {
    e.preventDefault();

    const techsFormatted = techs.split(',').map(tech => tech.trim());

    api.post('repositories', {
      url,
      title,
      techs: techsFormatted,
    }).then(response => {
      setRepositories([...repositories, response.data]);
    }).catch(err => {
      console.log(err.response.data);
    });
  }

  async function handleRemoveRepository(id) {
    

    api.delete(`repositories/${id}`)
      .then(() => {
        setRepositories(currentRepositories => {
          return currentRepositories.filter(repository => repository.id !== id);
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="container">
      <h1>Criar repósitorio</h1>

      <form onSubmit={handleAddRepository}>
        <input 
          type="text" 
          placeholder="URL do repósitorio"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />

        <input 
          type="text" 
          placeholder="Titúlo do repósitorio"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <span>Separar tecnlogias por virgúlas</span>
        <input 
          type="text" 
          placeholder="Teconlogias utilizadas"
          value={techs}
          onChange={e => setTechs(e.target.value)}
          required
        />

        <button type="submit" onClick={handleAddRepository}>Adicionar</button>
      </form>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <span>{repository.title}</span>

            <p>{repository.techs.join(', ')}.</p>

            <div>
              <a href={repository.url}>Link para repósitorio</a>

              <button onClick={() => handleRemoveRepository(repository.id)}>
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

import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    getRespositories()
  }, [])


  async function getRespositories() {
    api.get('/repositories')
      .then(result => {
        const { data } = result
        setRepositories(data)
      })
  }

  async function handleAddRepository() {
    const repository = {
      "title": `Desafio ReactJS`  
    }
    api.post('/repositories', repository)
    setRepositories([ ...repositories, repository ])    
  }

  async function handleRemoveRepository(id) {    
    api.delete(`/repositories/${id}`)
      .then(() => {
        const newRepositoryList = repositories.filter( repository =>  repository.id !== id )
        setRepositories(newRepositoryList)
      })    
  }

  return (
    <div>
      <ul data-testid="repository-list">
                
        {repositories.map( repository =>
          
          <li key={`${repository.id}${Math.floor(Date.now() / 1000)}`}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>

        )}


      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

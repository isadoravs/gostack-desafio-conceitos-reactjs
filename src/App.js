import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((result) => setRepositories(result.data));
  }, []);

  async function handleAddRepository() {
    const result = await api.post("repositories", {
      url: "https://github.com/isadoravs",
      title: `Repo ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    if (result.data) {
      setRepositories([...repositories, result.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`repositories/${id}`);
    if (result.status === 204) {
      setRepositories(repositories.filter((rep) => rep.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

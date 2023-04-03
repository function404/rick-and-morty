import "./css/App.css";
import { useState, useEffect } from "react";

function App() {
  const [conteudo, setConteudo] = useState(<></>);

  async function carregarTodosOsPersonagens() {
    const result = await fetch(
      "https://rickandmortyapi.com/api/character/",

      { method: "GET" }
    ).then((reponse) => reponse.json());

    return result.results;
  }

  async function listaPersonagem() {
    const todosPersonagens = await carregarTodosOsPersonagens();

    return todosPersonagens.map((e) => (
      <div className="card char">
        <div>
          <img src={e.image} />
        </div>
        <div>
          <h2>{e.name}</h2>
        </div>
        <div className="char-info">
          <span>Espécie: {e.species == "Human" ? "Humano" : "Não humano"}</span>
        </div>
        <div className="char-info">
          <span>Gênero: {e.gender == "Male" ? "Masculino" : "Feminino"}</span>
        </div>
        <div className="lista-secundaria">
          <span>
            Participações:{" "}
            {e.episode.map((ep) => (
              <> ep-{ep.charAt(40) < 1 ? ep.charAt(40) : ''+ ep.charAt(40) + '' + ep.charAt(41) + ''} | </>
            ))}
          </span>
        </div>
        <div className="char-info">
          <span>
            Info:{" "}
            {e.status == "Alive"
              ? "Vivo"
              : e.status == "unknown"
              ? "Desconhecido"
              : "Morto"}
          </span>
        </div>
      </div>
    ));
  }

  useEffect(() => {
    async function carregar() {
      setConteudo(await listaPersonagem());
    }
    carregar();
  }, []);

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className="lista-principal">{conteudo}</div>
    </div>
  );
}

export default App;

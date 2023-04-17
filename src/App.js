import "./css/App.css";
import { useState, useEffect } from "react";

function App() {
  const [conteudo, setConteudo] = useState(<></>);
  const [busca, setBusca] = useState('');

  async function carregarTodosOsPersonagens() {
    
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const result = await fetch(
      "https://rickandmortyapi.com/api/character/?status="+ busca, requestOptions
    )
    .then(reponse => reponse.text())
    .then(result => { return result})
    .catch(error => console.log("error", error));

    const char = JSON.parse(result)

    return char.results;
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
    carregar()
  }, [busca]);

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className="filtros">
        <span className="filtros-titulos"> Filtros</span>
          <div className="filtro status">
            <b>Status:</b>
            <span onClick={() => setBusca('live')}>Vivo</span>
            <span onClick={() => setBusca('dead')}>Morto</span>
            <span onClick={() => setBusca('unknown')}>Desconhecido</span>
          </div>
          <div className="filtro genero">
            <b>Gênero:</b>
            <span onClick={() => (busca === 'live' || busca === 'dead' || busca === 'unknown' ? setBusca(busca + '&gender=male') : setBusca('&gender=male'))}>Masculino</span>
            <span onClick={() => (busca === 'live' || busca === 'dead' || busca === 'unknown' ? setBusca(busca + '&gender=female') : setBusca('&gender=female'))}>Feminino</span>
            <span onClick={() => (busca === 'live' || busca === 'dead' || busca === 'unknown' ? setBusca(busca + '&gender=Genderless') : setBusca('&gender=genderless'))}>Sem Gênero</span>
            <span onClick={() => (busca === 'live' || busca === 'dead' || busca === 'unknown' ? setBusca(busca + '&gender=unknown') : setBusca('&gender=unknown'))}>Desconhecido</span>
          </div>
      </div>  
      <div className="lista-principal">{conteudo}</div>
    </div>
  );
}

export default App;

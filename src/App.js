import React, { Component } from "react";
import api from './api';
 
class App extends Component {
 
  state = {
    filmes: [],
    query: ''
  }
 
  /*async componentDidMount(){
    const resposta = await api.get('Star%20Wars');
    this.setState({ filmes: resposta.data });
  }*/
 
  handleInputChange = event => {
    this.setState({ query: event.target.value });
  }
 
  async fetchFilmes(query){
    const resposta = await api.get(query);
    this.setState({ filmes: resposta.data});
  }
 
  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.fetchFilmes(query);
  }
 
  render(){
 
    const { filmes, query } = this.state;
 
    return(
      <div>
        <h1>Listar Filmes</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Pesquisar por Título:</label>
          <input type="text" value={query} onChange={this.handleInputChange} />
          <button type="submit">Pesquisar</button>
        </form>
 
        {
          filmes.map(filme => (
            <li key={filme.show.id}>
              <h2>Título: <strong>{filme.show.name}</strong></h2>
              <p>{filme.show.url}</p>
              <p>
                {filme.show.image && filme.show.image.medium ?(
                <img src={filme.show.image.medium} />
                ) : (
                  <span>Imagem não disponível</span>
                )}
              </p>
            </li>
          ))
        }
      </div>  
    );
  };
};
 
export default App;
import React, { useState,  useEffect } from 'react';
import api from './services/api';

//import Demo01 from './Demo01'; //<Demo01 />
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';

//<aside>  Side Bar...
function App() {

  const [devs, setDevs] = useState([]);

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState(-25.0978304); //valor default....
  const [longitude, setLongitude] = useState(-50.155519999999996);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []); //Executa uma unica vez...

  //Busca dos devs da api: para executar apenas uma vez...
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      //Armazenar os devs em um estado...
      setDevs(response.data);
    };
    loadDevs();
  }, []); //Executa uma unica vez...

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    });

    console.log(response.data);

    //Limpar campos
    setGithubUsername('');
    setTechs('');

    //Adiciona o novo na listagem... copia os devs que vc ja tem...
    setDevs([...devs, response.data]); //Adicao... 
    //Remoçao: .filter...
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required 
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required 
            value={techs}
            onChange={e => setTechs(e.target.value)}/>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" name="latitude" id="latitude" 
              required value={latitude} 
              onChange={e => setLatitude(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" 
              required value={longitude}
              onChange={e => setLongitude(e.target.value)} />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

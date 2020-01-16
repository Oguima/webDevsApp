import React, { useState,  useEffect } from 'react';
import api from './services/api';

//import Demo01 from './Demo01'; //<Demo01 />
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

//<aside>  Side Bar...
function App() {

  const [devs, setDevs] = useState([]);


  

  //Busca dos devs da api: para executar apenas uma vez...
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      //Armazenar os devs em um estado...
      setDevs(response.data);
    };
    loadDevs();
  }, []); //Executa uma unica vez...

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    console.log(response.data);

    //Adiciona o novo na listagem... copia os devs que vc ja tem...
    setDevs([...devs, response.data]); //Adicao... 
    //Remoçao: .filter...
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
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

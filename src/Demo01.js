import React, { useState } from 'react';

import HeaderDemo from './HeaderDemo';

//Componente: ideal 1 componente por arquivo...
//Bloco isolado de HTML, CSS, e Js ... 
//propriedade: atributos para o componente
//Para acessar a propriedade no HEader... (props)
//{props.title}
//Informaçõe que o componente pai passa para o filho...
//Estado:
//Para monitorar mudanças ...
//Informações mantidas pelo componente... (Imutabilidade): sempre cria um novo.

function Demo01() {
  //Desestruturação...
  const [counter , setCounter] = useState(0); //vetor com 2 variaveis...

  //let counter = 0; 

  function incrementCounter() {
    //alert("Hello");
    //counter++;
    setCounter(counter + 1);
  }

  return (
    <>
      <HeaderDemo title="Tit 1" />
      <HeaderDemo title="Tit 2" />
      <HeaderDemo title="Tit 3" />

  <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default Demo01;

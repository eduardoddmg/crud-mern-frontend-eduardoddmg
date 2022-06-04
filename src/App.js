import { useState, useEffect } from 'react';
import Rotas from './Rotas';
import { contextGeral } from './context/Context'

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <>
    <contextGeral.Provider value={{data, setData}}>
      <Rotas />
    </contextGeral.Provider>
    </>
  )
}

export default App;

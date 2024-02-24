import './App.css';
import { useState } from 'react';

function App() {
  const [result, SetResult] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logoApp.png" className="App-logo" alt="logo" />
      </header>
      <div className="container">
        <div className="left-split">
          <div className="top-left">
            <p>Soy operador en campo</p>
            <button>Ingresar datos</button>
          </div>
          <div className="bottom-left">
            <p>Soy operador de almacén</p>
            <button>Ingresar datos</button>
          </div>
        </div>
        <div className="right-split">
          <p>Soy Administrador</p>
          <button onClick={async () => {
            const res = await fetch('https://saasbinxx-prototype.onrender.com/users');
            const data = await res.json();
            console.log(data);
            SetResult(data)
          }}>Gestionar</button>
        </div>
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [result, SetResult] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={async() => {
          const res = await fetch('https://saasbinxx-prototype.onrender.com/users');
          const data = await res.json();
          console.log(data);
          SetResult(data)
        }}>
          Users
        </button>

        <p>
          Haga clic en el botón par ver usuarios.
        </p>

        <p>
          {JSON.stringify(result,null,2)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

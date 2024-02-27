import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FormPage from './FormPage.js';
import MainPage from './main.js';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logoApp.png" className="App-logo" alt="logo" />
      </header>
      <Router>
        <Routes>
          <Route path='/form' element={<FormPage />}>
          </Route>
          <Route path='/' element={<MainPage />}>            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

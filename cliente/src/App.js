import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FormPage from './Components/FieldOp/FormPage.js';
import WarehouseOperator from './Components/WarehouseOp/WarehouseOperator.js'
import MainPage from './main.js';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logoApp.png" className="App-logo" alt="logo" />
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/FOpform' element={<FormPage />}></Route>
          <Route path='/WOpform' element={<WarehouseOperator />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

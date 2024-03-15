import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <nav>

        <div className="nav-row">
          <h1 className="logo-h1">Property Listings</h1>

          <div>
            <div>
              <input className="main-search-input" placeholder="Search" />
            </div>
          </div>


          <div>
            <div className="nav-rows">
              <p>Login/Sign Up</p>
              <p>Bell</p>
            </div>
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

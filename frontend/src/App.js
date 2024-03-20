import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './Pages/Search';
import SearchResults from './Pages/SearchResults';
import PropertyDetails from './Pages/PropertyDetails';
import Charts from './Pages/Charts';

function App() {
  return (
    <Router>
      <nav>

        <div className="nav-row">
          <Link className='link-unset' to="/">
          <h1 className="logo-h1">Property Listings</h1>
          </Link>

          <div>
            <div>
              <Search />
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
        <Route path="/search-results" component={SearchResults} />
        <Route path="/property/:propertyUrl" component={PropertyDetails} />
        <Route path="/Charts" element={<Charts />} />
      </Routes>
      <footer>
        <p>Footer</p>
      </footer>
    </Router>
  );
}

export default App;

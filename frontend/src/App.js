import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './Pages/Search';
import SearchResults from './Pages/SearchResults';
import PropertyDetails from './Pages/PropertyDetails';
import Charts from './Pages/Charts';
import PropertySearch from './Pages/PropertySearch';
import Budget from './Pages/Budget';

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
        
                <p style={{color: 'white', cursor: 'pointer'}}>Sign in</p>
              <div className='log-in-btn'>
              <p className='lg-text'>Get started</p>
              </div>
              <div>
              {/* <p>Bell</p> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" component={SearchResults} />
        <Route path="/property/:propertyUrl" component={PropertyDetails} />
        <Route path="/Charts" element={<Charts />} />
        <Route path="/search" element={<PropertySearch />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
      <footer>
        <div>
          <div className='inner-footer-div'>
            <p>Home</p>
            <p>Features</p>
            <p>Charts</p>
            <p>About</p>
          </div>
          <hr className='inner-line' />
          <p>2024 Inc.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;

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
import { BsHouseHeartFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import React, { useState } from 'react';



function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuModal, setMenuModal] = useState(false)

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openMenu = () => {
    setMenuModal(!menuModal);
  }


  return (
    <Router>
      <nav>

        <div className="nav-row">
          <Link className='link-unset' to="/">
            <h1 className="logo-h1">Property Listings</h1>
            <BsHouseHeartFill className='logo-icon' />
          </Link>

          <div>
            <div onClick={toggleModal}>
              <Search />
            </div>
          </div>


          <div>
            <div className="nav-rows">

              <p style={{ color: 'white', cursor: 'pointer' }}>Sign in</p>
              <div className='log-in-btn'>
                <p className='lg-text'>Get started</p>
              </div>
              <div>
                {/* <p>Bell</p> */}
              </div>
            </div>
            <IoMenu onClick={openMenu} className='logo-menu' />
          </div>
        </div>
      </nav>

      {menuModal && (
        <div className='menu-modal-overlay'>
          <div className='menu-modal'>
             <span className="close" onClick={openMenu}>&times;</span>
             <div className='menu-modal-content'>

              <Link to="/charts" className='link'>
                <p>Charts</p>
              </Link>

              <Link to="/budget" className='link'>
                <p>Budget Calculations</p>
              </Link>

             </div>
          </div>

        </div>
      )}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={toggleModal}>&times;</span>
            <div className="modal-content">
              <h2>Search</h2>
              <p>Select a city.</p>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='border-line'>
                  <p>Trending</p>
                </div>

                <div style={{ width: '70%' }}>
                  <p className='mc-title'>More Cities</p>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div className='city-btn'>
                      <p className='city-text'>Charlotte</p>
                    </div>

                    <div className='city-btn'>
                      <p className='city-text'>Miami</p>
                    </div>

                    <div className='city-btn'>
                      <p className='city-text'>Chicago</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div className='city-btn'>
                      <p className='city-text'>Austin</p>
                    </div>

                    <div className='city-btn'>
                      <p className='city-text'>Atlanta</p>
                    </div>

                    <div className='city-btn'>
                      <p className='city-text'>Nashville</p>
                    </div>
                  </div>

             
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

import React, { useState, useEffect } from 'react';
import '../Pages/Home.css'

function Home() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/api/properties')
        .then(response => response.json())
        .then(data => setProperties(data))
        .catch(error => console.error('Error fetching properties:', error));
    }, []);
  return (

    <div>
    <div className='main-panel-container'>
    <div className="left-panel">
            <h2>Filters</h2>
            <div className="filter">
               
                <label for="sale">Sale</label>
            </div>
            <div className="filter">
              
                <label for="pending">Pending</label>
            </div>
            <div className="filter">
                <label for="sold">Sold</label>
            </div>
            <div className="filter">
                <a href="templates/charts.html">
                    <label for="sold">Charts</label>
                </a>
            </div>

            <div className="filter">
                <label for="sold">Agent</label>
            </div>
        </div>
    <div className='right-panel'>
    <div className="btn-row">
                <p className="filter-btn" data-filter="buy">Buy</p>
                <p className="filter-btn" data-filter="sold">Sold</p>
                <p className="filter-btn" data-filter="rent">Rent</p>
            </div>

        <div className="loc-box">
            <p className="loc-title">Boston, MA</p>
            <p className="loc-copy">100 Properites found in Boston</p>
        </div>
        <div className="li-max-container">
      {properties.map(property => (
        <li key={property.property_url} className="li-col">
     <ul className="li-inner">
  {Object.entries(property).map(([key, value]) => {
    // Define an array of keys that you want to hide
    const keysToHide = ['unit', 'zip_code', 'year_built', 'sold_price','sqft', 'sold_price', 'stories', 'parking_garage','mls_id','price_per_sqft', 'mls','lot_sqft','longitude']; // Add your keys here

    // Check if the current key is in the keysToHide array
    const shouldHide = keysToHide.includes(key);

    // Determine the class name based on the key
    const className = key === 'primary_photo' ? 'rp-col' : shouldHide ? 'hidden' : 'copy';

    // Render the list item only if it's not in the keysToHide array
    return shouldHide ? null : (
      <li key={key} className={className}>
        {key === 'primary_photo' ? (
          <img className="primary-img" src={value} alt="Primary Photo" />
        ) : (
          `${key}: ${value}`
        )}
      </li>
    );
  })}
</ul>
        </li>
      ))}
    </div>
    </div>
 

    </div>
  </div>
  )
}

export default Home
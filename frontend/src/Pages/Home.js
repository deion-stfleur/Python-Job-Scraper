import React, { useState, useEffect } from 'react';
import '../Pages/Home.css'
import SoldPropertiesComp from './SoldPropertiesComp';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    const [properties, setProperties] = useState([]);
    const [soldProperties, setSoldProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handlePropertyClick = (propertyUrl) => {
        navigate(`/property-details/${propertyUrl}`);
    };

    const [activeFilter, setActiveFilter] = useState('buy');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    useEffect(() => {
      fetch('http://127.0.0.1:5000/api/properties')
        .then(response => response.json())
        .then(data => {
            setProperties(data);
            setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => console.error('Error fetching properties:', error));
    }, []);


    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/properties-for-sold')
          .then(response => response.json())
          .then(data => setSoldProperties(data))
          .catch(error => console.error('Error fetching sold properties:', error));
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
               <Link className='link' to="/Charts">
                    <label for="sold">Charts</label>
               </Link>
              
            </div>

            <div className="filter">
                <label for="sold">Agent</label>
            </div>
        </div>
    <div className='right-panel'>
    <div className="btn-row">
    <p className={activeFilter === 'buy' ? 'filter-btn active' : 'filter-btn'} onClick={() => handleFilterClick('buy')}>Buy</p>
                <p className={activeFilter === 'sold' ? 'filter-btn active' : 'filter-btn'} onClick={() => handleFilterClick('sold')}>Sold</p>
                <p className={activeFilter === 'rent' ? 'filter-btn active' : 'filter-btn'} onClick={() => handleFilterClick('rent')}>Rent</p>
            </div>

        <div className="loc-box">
            <p className="loc-title">Boston, MA</p>
            <p className="loc-copy">100 Properites found in Boston</p>
        </div>

        <div className={`content ${activeFilter}`}>
                {activeFilter === 'buy' && (
                    <>
                      <div>
            {loading ? (
                // Display loading text while data is being fetched
                <p>Loading...</p>
            ) : (
                // Render property list once data is fetched
                <>
                <div className="li-max-container">
                    {properties.map(property => (
              
                        <li key={property.property_url} className="li-col">
                            <ul className="li-inner">
                                {Object.entries(property).map(([key, value]) => {
                                    // Define an array of keys that you want to hide
                                    const keysToHide = ['unit', 'zip_code', 'year_built', 
                                                        'sold_price','sqft', 'sold_price', 
                                                        'stories', 'parking_garage','mls_id',
                                                        'price_per_sqft', 'mls','lot_sqft',
                                                        'longitude', 'list_price','list_date',
                                                        'latitude', 'last_sold_date','hoa_fee',
                                                        'half_baths', 'full_baths','days_on_mls',
                                                        'alt_photos', 'property_url', 'beds', 'city']; // Add your keys here

                                    // Check if the current key is in the keysToHide array
                                    const shouldHide = keysToHide.includes(key);

                                    // Determine the class name based on the key
                                    const className = key === 'primary_photo' ? 'rp-col' : shouldHide ? 'hidden' : 'copy';

                                    // Render the list item only if it's not in the keysToHide array
                                    return shouldHide ? null : (
                                        <li key={key} className={className}>
                                            {key === 'primary_photo' ? (
                                             <a href={property.property_url} target="_blank" rel="noopener noreferrer">
                                                <img  className="primary-img" src={value} alt="Primary Photo" />                                                
                                              </a>
                                            ) : (
                                                //   `${key}: ${value}`
                                                `${value}`
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                  
                    ))}
                </div>
                </>
            )}
        </div>
                    </>
                )}
                {activeFilter === 'sold' && (
                    <>
                    <SoldPropertiesComp />
                    </>
                )}
                {activeFilter === 'rent' && (
                    <>
                  
                      <div className="li-max-container">
      {properties.map(property => (
        <li key={property.property_url} className="li-col">
     <ul className="li-inner">
  {Object.entries(property).map(([key, value]) => {
    // Define an array of keys that you want to hide
    const keysToHide = ['unit', 'zip_code', 'year_built', 
                        'sold_price','sqft', 'sold_price', 
                        'stories', 'parking_garage','mls_id',
                        'price_per_sqft', 'mls','lot_sqft',
                        'longitude', 'list_price','list_date',
                         'latitude', 'last_sold_date','hoa_fee',
                          'half_baths', 'full_baths','days_on_mls',
                        'alt_photos', 'property_url', 'beds']; // Add your keys here

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
        //   `${key}: ${value}`
        `${value}`
        )}
      </li>
    );
  })}
</ul>
        </li>
      ))}
    </div>
                    </>
                )}
            </div>



      
    </div>
 

    </div>
  </div>
  )
}

export default Home
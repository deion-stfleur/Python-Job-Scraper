import React, { useState, useEffect } from 'react';
import '../Pages/Home.css'

function SoldPropertiesComp() {
    const [soldProperties, setSoldProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/properties-for-sold')
          .then(response => response.json())
          .then(data => {
              setSoldProperties(data);
              setLoading(false); // Set loading to false once data is fetched
          })
          .catch(error => console.error('Error fetching sold properties:', error));
      }, []);
  return (
    <div>
          {loading ? (
                // Display loading text while data is being fetched
                <p>Loading...</p>
            ) : (
              <div className="li-max-container">
      {soldProperties.map(property => (
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
          <img className="primary-img" src={value} alt="Primary Photo" />
        ) : (
          `${key}: ${value}`
        // `${value}`
        )}
      </li>
    );
  })}
</ul>
        </li>
      ))}
    </div>
    )}
    </div>
  )
}

export default SoldPropertiesComp
import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const properties = location.state.properties;

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {properties.map(property => (
          <li key={property.property_url}>{property.address}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;

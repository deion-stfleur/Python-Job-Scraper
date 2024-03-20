import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';

function Search() {
    const [location, setLocation] = useState('');
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate(); // Use useNavigate() instead of useHistory()

    const handleSearch = () => {
        fetch(`http://127.0.0.1:5000/api/search?location=${location}`)
            .then(response => response.json())
            .then(data => {
                setProperties(data);
                // Redirect to the search results page
                navigate('/search-results', { state: { properties: data } }); // Use navigate() to redirect
            })
            .catch(error => console.error('Error searching properties:', error));
    };

    return (
        <div>
            <input type="text" className="main-search-input" placeholder="Enter City ex. Boston,MA" value={location} onChange={(e) => setLocation(e.target.value)} />
            {/* <button onClick={handleSearch}>Search</button> */}
            {/* <ul>
                {properties.map(property => (
                    <li key={property.property_url}>{property.address}</li>
                ))}
            </ul> */}
        </div>
    );
}

export default Search;

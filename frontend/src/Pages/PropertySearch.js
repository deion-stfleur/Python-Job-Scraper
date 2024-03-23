import React, { useState } from 'react';
import axios from 'axios';

const PropertySearch = () => {
    const [location, setLocation] = useState('');
    const [searchResults, setSearchResults] = useState({
        for_sale: [],
        sold: [],
        pending: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`http://127.0.0.1:5000/api/search?location=${location}`);
            setSearchResults(response.data);
        } catch (error) {
            setError('Failed to fetch search results.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div>
                <h2>Properties for Sale</h2>
                <ul>
                    {searchResults.for_sale.map((property, index) => (
                        <li key={index}>{property.address}</li> // Adjust to display actual property information
                    ))}
                </ul>
                <h2>Sold Properties</h2>
                <ul>
                    {searchResults.sold.map((property, index) => (
                        <li key={index}>{property.address}</li> // Adjust to display actual property information
                    ))}
                </ul>
                <h2>Pending Properties</h2>
                <ul>
                    {searchResults.pending.map((property, index) => (
                        <li key={index}>{property.address}</li> // Adjust to display actual property information
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PropertySearch;

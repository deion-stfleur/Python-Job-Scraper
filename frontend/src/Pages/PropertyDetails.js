import React from 'react';

function PropertyDetails(props) {
  const { property } = props.location.state;

  return (
    <div>
      <h2>Property Details</h2>
      {/* <p>Street: {property.street}</p>
      <p>City: {property.city}</p> */}
      {/* Display other property details */}
    </div>
  );
}

export default PropertyDetails;
import React from 'react';
import './index.css';

function Address({ street, city, state, zip }) {
    return (
        <div className="address">
            <p>{street}</p>
            <p>{city}, {state} {zip}</p>
        </div>
    );
}

export default Address;
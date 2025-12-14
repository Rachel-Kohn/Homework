import React from 'react';
import Address from './Address.jsx';

function App() {
  const homeStreet = "456 Elm St";
  const homeCity = "Los Angeles";
  const homeState = "CA";
  const homeZip = "90001";

  return (
    <div className="app">
      <h1>My React Address App</h1>
      <Address
        street={homeStreet}
        city={homeCity}
        state={homeState}
        zip={homeZip}
      />
    </div>
  );
}

export default App;
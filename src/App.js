import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file

function CountriesApp() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch countries");
      });
  };

  return (
    <div className="grid-container">
      {error && <p>{error}</p>}
      {countries.length > 0 ? (
        countries.map((country) => (
          <div key={country.name.common} className="grid-item">
            <img src={country.flags.svg} alt={country.name.common} />
            <p>{country.name.common}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountriesApp;

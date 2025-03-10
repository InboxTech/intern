import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightSearch = () => {
  // State for flights data, loading, and error
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // States for form selections
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Fetch flight data from Node.js API
  useEffect(() => {
    axios
      .get('http://localhost:5000/')  // Node.js API URL
      .then((response) => {
        setFlights(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  // Handle the "From" city selection
  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  // Handle the "To" city selection
  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  // Filter flights based on the selected "from" and "to"
  const filteredFlights = flights.filter(
    (flight) =>
      (from ? flight.departure_airport === from : true) &&
      (to ? flight.arrival_airport === to : true)
  );

  // Render the form and filtered flight data in a table
  return (
    <div>
      <form>
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="from">From</label>
            <select
              id="from"
              value={from}
              onChange={handleFromChange}
              className="w-full p-3 border rounded"
            >
              <option value="">Select a city</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>{error}</option>
              ) : (
                [...new Set(flights.map((flight) => flight.departure_airport))].map((airport) => (
                  <option key={airport} value={airport}>
                    {airport}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="to">To</label>
            <select
              id="to"
              value={to}
              onChange={handleToChange}
              className="w-full p-3 border rounded"
            >
              <option value="">Select a city</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>{error}</option>
              ) : (
                [...new Set(flights.map((flight) => flight.arrival_airport))].map((airport) => (
                  <option key={airport} value={airport}>
                    {airport}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </form>

      {/* Display filtered flight data */}
      <div>
        <h3>Available Flights:</h3>
        <ul>
          {filteredFlights.map((flight) => (
            <li key={flight.id}>
              {flight.flight_number} from {flight.departure_airport} to {flight.arrival_airport}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightSearch;

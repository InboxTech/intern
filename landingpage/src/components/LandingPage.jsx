import React, { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import Header from "./Header";
import TravelDeals from "./TravelDeals";
import Footer from "./Footer";
import TravelersCabinClass from "./TravelersCabinClass";

const LandingPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

   // Fetch city and airport data from API
   useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"); // API
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Filter cities based on input
  const handleCitySearch = (input, setFunction, field) => {
    setFunction(input);
    setActiveField(field); // Track which field is active for dropdown display
    if (input.length > 1) {
      const filtered = cities.filter(
        (city) =>
          city.name.toLowerCase().includes(input.toLowerCase()) ||
          city.code.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className="px-12 py-10 h-screen bg-cover bg-center flex items-center justify-center pt-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbmV8ZW58MHx8MHx8fDA%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Search and Book Flights
          </h1>
          <p className="text-white mb-8 max-w-xl mx-auto">
            <b>Millions of cheap flights. One simple search.</b>
          </p>

          {/* Search Form */}
          <form className="bg-gray-300 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-black mb-1" htmlFor="from">
                From
              </label>
              <input
                type="text"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Departure city"
                className="w-full p-3 border rounded"
                required
              />
               {activeField === "from" && filteredCities.length > 0 && (
                  <ul className="absolute w-full bg-white border mt-1 rounded shadow-lg z-50">
                    {filteredCities.map((city) => (
                      <li
                        key={city.code}
                        className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                        onClick={() => {
                          setFrom(`${city.name} (${city.code})`);
                          setFilteredCities([]);
                        }}
                      >
                        ✈️ <span className="ml-2 font-semibold">{city.name} ({city.code})</span>
                      </li>
                    ))}
                  </ul>
                )}

            </div>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-400 transition mt-6"
            >
              <ArrowLeftRight size={20} />
            </button>

            <div className="flex-1">
              <label className="block text-black mb-1" htmlFor="to">
                To
              </label>
              <input
                type="text"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination city"
                className="w-full p-3 border rounded"
                required
              />
               {activeField === "to" && filteredCities.length > 0 && (
                  <ul className="absolute w-full bg-white border mt-1 rounded shadow-lg z-50">
                    {filteredCities.map((city) => (
                      <li
                        key={city.code}
                        className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                        onClick={() => {
                          setTo(`${city.name} (${city.code})`);
                          setFilteredCities([]);
                        }}
                      >
                        ✈️ <span className="ml-2 font-semibold">{city.name} ({city.code})</span>
                      </li>
                    ))}
                  </ul>
                )}

            </div>
            </div>

            <div className="flex-1">
              <label className="block text-black mb-1" htmlFor="date">
                Depart
              </label>
              <input
                type="date"
                id="date"
                className="w-full p-3 border rounded cursor-pointer"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-black mb-1" htmlFor="date">
                Return
              </label>
              <input
                type="date"
                id="date"
                className="w-full p-3 border rounded cursor-pointer"
                required
              />
            </div>

            {/* Travelers and Cabin Class Dropdown */}
              <TravelersCabinClass />

            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mt-6 cursor-pointer">
              Search
            </button>
          </form>

         {/* Checkbox */}
         <div className="flex items-center space-x-6 mt-4 text-white">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox w-5 h-5 text-blue-600" />
              <span>Add nearby airports</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox w-5 h-5 text-blue-600" />
              <span>Direct flights</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox w-5 h-5 text-blue-600" />
              <span>Flexible tickets</span>
            </label>
          </div>

        </div>
      </section>

       {/* New Section (Above TravelDeals) */}
       <section className="px-15 py-18 bg-white">
        {/* Top Buttons */}
        <div className="flex justify-center space-x-6 mt-5 mb-8 relative">
          <button className="bg-[#031B3D] text-white px-30 py-3 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-900 cursor-pointer"
          onClick={() => alert("Hotels clicked!")}>
            <span>🏨 Hotels</span>
          </button>
          <button className="bg-[#031B3D] text-white px-30 py-3 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-900 cursor-pointer"
          onClick={() => alert("Car hire clicked!")}>
            <span>🚗 Car hire</span>
          </button>
          <button className="bg-[#031B3D] text-white px-30 py-3 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-900   cursor-pointer"
          onClick={() => alert("Explore everywhere clicked!")}>
            <span>🔍 Explore everywhere</span>
          </button>
        </div>

        {/* Banner */}
        <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/images/samuel-ferrara-1527pjeb6jg-unsplash.jpg"
            alt="Scenic view"
            className="w-full h-120 object-cover"
          />
          {/* Text Content */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center px-6 text-white bg-black/50">
            <p className="text-lg uppercase">Grab a deal</p>
            <h2 className="text-4xl font-bold mt-2">
              When the price is low, you'll know
            </h2>
            <p className="mt-2 text-lg">
              Score cheaper seats with Price Alerts
            </p>
            <button className="p-1 w-30 mt-5 bg-white text-black rounded-2xl font-semibold shadow-md hover:bg-gray-500 cursor-pointer"
            onClick={() => alert("How it works!")}>
              How it works
            </button>
          </div>

        </div>
      </section>
      <hr className="border-blue-900 "/>

      {/* Swiper Section */}
      <TravelDeals />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;

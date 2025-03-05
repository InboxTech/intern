import React, { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import Header from "./Header";
import TravelDeals from "./TravelDeals";
import Footer from "./Footer";
import TravelersCabinClass from "./TravelersCabinClass";
import FAQSection from "./FAQSection";
import { FaHotel, FaCar, FaSearchLocation } from "react-icons/fa";


const images = [
  "/images/samuel-ferrara-1527pjeb6jg-unsplash.jpg",
  "/images/daniel-leone-g30P1zcOzXo-unsplash.jpg",
  "/images/benjamin-voros-phIFdC6lA4E-unsplash.jpg",
  "/images/kalen-emsley-Bkci_8qcdvQ-unsplash.jpg"
];


const LandingPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [filteredCities, setFilteredCities] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [countries, setCountries] = useState([]);
  const [citiesByCountry, setCitiesByCountry] = useState({});
  const API_KEY = "SjlJdnQ1ZVFEVjlRNFJheEJaTWdCeHRZY3FuNTdGTjRpaHM5YjVudg==";
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };


   //Fetch city and airport data from API
   useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://api.countrystatecity.in/v1/countries", {
          headers: {
            "X-CSCAPI-KEY": "SjlJdnQ1ZVFEVjlRNFJheEJaTWdCeHRZY3FuNTdGTjRpaHM5YjVudg==", 
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Countries:", data);
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

   // Fetch all cities for each country
   useEffect(() => {
    if (countries.length === 0) return;

    const fetchCitiesForAllCountries = async () => {
      try {
        const cityRequests = countries.map((country) =>
          fetch(`https://api.countrystatecity.in/v1/countries/${country.iso2}/cities`, {
            headers: { "X-CSCAPI-KEY": "SjlJdnQ1ZVFEVjlRNFJheEJaTWdCeHRZY3FuNTdGTjRpaHM5YjVudg==" },
          })
            .then((res) => res.json())
            .then((cities) => ({ country: country.iso2, cities }))
        );

        const allCities = await Promise.all(cityRequests);
        const cityData = allCities.reduce((acc, { country, cities }) => {
          acc[country] = cities;
          return acc;
        }, {});

        console.log("Fetched Cities by Country:", cityData);
        setCitiesByCountry(cityData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCitiesForAllCountries();
  }, [countries]);
  

   // Filter cities dynamically as user types
   const handleCitySearch = (input, field) => {
    setActiveField(field);
    if (input.length > 1) {
      const allCities = Object.values(citiesByCountry).flat();
      const filtered = allCities.filter((city) =>
        city.name.toLowerCase().includes(input.toLowerCase())
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
        className="px-12 py-10 h-screen bg-cover bg-center flex items-center justify-center pt-20 object-cover"
        style={{
          backgroundImage: "url('https://i.pinimg.com/474x/41/0a/22/410a226d01a8747fe75a3b46d00d3c5a.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "cover"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0 pointer-events-none"></div>

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
              <label className="block text-black mb-1" htmlFor="country">
                Select Country
              </label>
              <select
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-3 border rounded"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.iso2} value={country.iso2}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-400 transition mt-6"
            >
              <ArrowLeftRight size={20} />
            </button>

          <div className="flex-1">
            <label className="block text-black mb-1" htmlFor="city">
              Select City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-3 border rounded"
              disabled={!selectedCountry}
            >
              <option value="">Select a city</option>
              {selectedCountry &&
                citiesByCountry[selectedCountry]?.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>

            {/* Swap Button */}
           
            {/* <div className="flex-1">
                <label className="block text-black mb-1" htmlFor="country">
                  Select Country
                </label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-3 border rounded"
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.iso2} value={country.iso2}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

                <div className="flex-1">
                  <label className="block text-black mb-1" htmlFor="city">
                    Select City
                  </label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 border rounded"
                    disabled={!selectedCountry}
                  >
                    <option value="">Select a city</option>
                    {selectedCountry &&
                      citiesByCountry[selectedCountry]?.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                  </select>
                </div> */}

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
            <FaHotel />
            <span>Hotels</span>
          </button>
          <button className="bg-[#031B3D] text-white px-30 py-3 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-900 cursor-pointer"
          onClick={() => alert("Car hire clicked!")}>
            <FaCar /> 
            <span>Car hire</span>
          </button>
          <button className="bg-[#031B3D] text-white px-30 py-3 rounded-lg flex items-center space-x-2 shadow-md hover:bg-blue-900   cursor-pointer"
          onClick={() => alert("Explore everywhere clicked!")}>
            <FaSearchLocation />
            <span>Explore everywhere</span>
          </button>
        </div>

        {/* Banner */}
        <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
        <img src={images[currentImage]} 
        alt="Scenic view" 
        className="w-full h-120 object-cover transition-opacity duration-500 ease-in-out" />
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
            onClick={() => alert("How it works clicked!")}>
              How it works
            </button>
          </div>

        </div>
      </section>
      <hr className="border-blue-900 "/>

      {/* Swiper Section */}
      <TravelDeals />

     {/* FAQs */}
     <FAQSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;

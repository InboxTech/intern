import React, { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import Header from "./Header";
import TravelDeals from "./TravelDeals";
import Footer from "./Footer";
import TravelersCabinClass from "./TravelersCabinClass";
import FAQSection from "./FAQSection";
import { FaHotel, FaCar, FaSearchLocation, FaTrash } from "react-icons/fa";
import FlightCardList from "./FlightCardList";
import { useNavigate } from "react-router-dom";

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
  // State for trip type selection (One Way, Return, Multi-City)
  const [tripType, setTripType] = useState("return");
  // State for multi-city trips (at least 2 by default)
  const [multiCityFlights, setMultiCityFlights] = useState([
     { id: 1, from: "", to: "", departDate: "" },
     { id: 2, from: "", to: "", departDate: "" },
  ]);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();
  


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSwap = (index = null) => {
    if (tripType === "multi-city" && index !== null) {
      // Swap for multi-city flights
      setMultiCityFlights((prevFlights) =>
        prevFlights.map((flight, i) =>
          i === index ? { ...flight, from: flight.to, to: flight.from } : flight
        )
      );
    } else {
      // Swap for single flights (one-way or return)
      setFrom(to);
      setTo(from);
    }
  };
  

  const handleMultiCityChange = (index, field, value) => {
    setMultiCityFlights((prevFlights) =>
      prevFlights.map((flight, i) =>
        i === index ? { ...flight, [field]: value } : flight
      )
    );
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
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.countrystatecity.in/v1/cities", {
          headers: {
            "X-CSCAPI-KEY": "SjlJdnQ1ZVFEVjlRNFJheEJaTWdCeHRZY3FuNTdGTjRpaHM5YjVudg==",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched Cities:", data);
        setFilteredCities(data); // Store all cities in filteredCities state
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
  
    fetchCities();
  }, []);
  

   // Filter cities dynamically as user types
   const handleCitySearch = (input, field) => {
    setActiveField(field);
    if (input.length > 1) {
      const allCities = Object.values(citiesByCountry).flat(); // Flatten all cities
      const filtered = allCities.filter((city) =>
        city.name.toLowerCase().includes(input.toLowerCase())
      );
      
      console.log("Filtered Cities:", filtered); // Debugging
  
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  // Function to add a new multi-city flight entry, ensuring a max of 6 flights
  const handleAddFlight = () => {
    if (multiCityFlights.length < 6) {
      setMultiCityFlights([...multiCityFlights, { from: "", to: "", departDate: "" }]);
    }
  };

  // Function to remove a multi-city flight entry (Ensures min 2 flights stay)
  const handleRemoveFlight = (index) => {
    if (multiCityFlights.length > 2) {
      setMultiCityFlights(multiCityFlights.filter((_, i) => i !== index));
    }
  };


  const handleSearch = () => { 
    console.log("Navigating to search results...");
    navigate("/search-results");  // Redirects to flight results page
    //navigate("/flights");  // Redirects to flight results page
  };


  const handleDepartChange = (e) => {
    const selectedDate = e.target.value;
    setDepartDate(selectedDate);

    // Reset return date if it's before the new departure date
    if (returnDate && returnDate < selectedDate) {
      setReturnDate("");
    }
  };

  
  return (
    <div className="">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className={`px-12 py-10 bg-cover bg-center flex items-center justify-center pt-32 object-cover transition-all duration-300 ease-in-out ${multiCityFlights.length > 2 ? 'h-auto min-h-screen' : 'h-screen'}`}  
        style={{
          backgroundImage: "url('https://plus.unsplash.com/premium_photo-1679830513990-82a4280f41b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHBsYW5lJTIwYmxhY2slMjBoZHxlbnwwfHwwfHx8MA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "cover"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  opacity-50 z-0 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            <b>Search and Book Flights</b>
          </h1>
          <h4 className="text-white text-xl mb-8 max-w-xl mx-auto">
            <b>Millions of cheap flights. One simple search.</b>
          </h4>


        {/* Radio Buttons for Trip Type */}
        <div className="flex justify-center space-x-4 mb-4 text-white">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="return"
              checked={tripType === "return"}
              onChange={() => setTripType("return")}
            />
            <span>Return</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              onChange={() => setTripType("one-way")}
            />
            <span>One Way</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="multi-city"
              onChange={() => setTripType("multi-city")}
            />
            <span>Multi-City</span>
          </label>
        </div>

          

         {/* Search Form (Default: Return or One-Way) */}
        {tripType !== "multi-city" ? (
          <form className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-black mb-1" htmlFor="country">
                  From
                </label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-3 border rounded cursor-pointer"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.iso2} value={country.name}>
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
                  To
                </label>
                <select
                  id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-3 border rounded cursor-pointer"
                  //required
                >
                  <option value="">Select a city</option>
                  {filteredCities.map((city, index) => (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
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
                value={departDate}
                onChange={handleDepartChange}
                min={new Date().toISOString().split("T")[0]} // Disables past dates
                required
              />
            </div>

            {tripType === "return" && (
              <div className="flex-1">
                <label className="block text-black mb-1" htmlFor="date">
                  Return
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-3 border rounded cursor-pointer"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departDate || new Date().toISOString().split("T")[0]}
                  disabled={!departDate} // Disable if depart date is not selected
                  required
                />
              </div>
            )}

            {/* Travelers and Cabin Class Dropdown */}
              <TravelersCabinClass />

            <button onClick={handleSearch} type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mt-6 cursor-pointer">
              Search
            </button>
          </form>
        ) : (
          // Multi-City Form
          <form>
          <div className="multi city-form">
            {multiCityFlights.map((flight, index) => (
              <div
                key={index}
                className="flex space-x-4 bg-white p-4 rounded-lg shadow-md mb-2"
              >
                <input
                  type="text"
                  placeholder="From"
                  value={multiCityFlights[index].from}
                  onChange={(e) => handleMultiCityChange(index, "from", e.target.value)}
                  className="p-2 border rounded w-1/3"
                  required
                />

              <button
                type="button"
                onClick={() => handleSwap(index)}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-400 transition mt-2"
              >
                <ArrowLeftRight size={20} />
              </button>

                <input
                  type="text"
                  placeholder="To"
                  value={multiCityFlights[index].to}
                  onChange={(e) => handleMultiCityChange(index, "to", e.target.value)}
                  className="p-2 border rounded w-1/3"
                  required
                />
                <input
                  type="date"
                  className="p-2 border rounded w-1/3 cursor-pointer"
                  value={multiCityFlights[index].departDate}
                  onChange={(e) => handleMultiCityChange(index, "departDate", e.target.value)}
                  min={index === 0 ? new Date().toISOString().split("T")[0] : multiCityFlights[index - 1].departDate} // Ensures next flight can't be before the previous one
                  required
                />
                
                {multiCityFlights.length > 2 && (
                  <button
                    onClick={() => handleRemoveFlight(index)}
                    className="bg-blue-950 hover:bg-blue-800 cursor-pointer text-white p-2 rounded flex items-center justify-center"
                  >
                     <FaTrash size={16} />
                  </button>
                )}
              </div>
            ))}
             <div className="flex items-center space-x-4">
             {/* Hide Add Flight button when max flights are reached */}
             {multiCityFlights.length < 6 && (
                  <button onClick={handleAddFlight} className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-2 py-3 rounded-lg mt-6 mr-26">
                    + Add Flight
                  </button>
             )}

            <TravelersCabinClass className="multi-city-travelers" />

            <button onClick={handleSearch} type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mt-6 cursor-pointer ml-auto">
              Search
            </button>
          </div>
          </div>
          </form>
        )}
         {/* Checkbox */}
         <div className="flex items-center space-x-6 mt-5 text-white">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox w-5 h-5 text-blue-600" />
              <span>Add nearby airports</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox w-5 h-5 text-blue-600" />
              <span>Direct flights</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox w-5 h-5 text-blue-600" />
              <span>Flexible tickets</span>
            </label>
          </div>
        </div>
      </section>

       {/* New Section (Above TravelDeals) */}
       <section className="px-15 py-10 bg-white">
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
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
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
      <hr className="border-black "/>

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

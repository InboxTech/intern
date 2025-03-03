import { useState } from "react";
import { FaPlaneDeparture, FaExchangeAlt } from "react-icons/fa";

export default function FlightBooking() {
  const [tripType, setTripType] = useState("one-way");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [childAge, setChildAge] = useState("upto 5 years");
  const [travelClass, setTravelClass] = useState("Economy");
  const [specialFare, setSpecialFare] = useState("Regular");

  const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Goa"];

  const handleSearch = () => {
    if (!startLocation || !destination || !departureDate || (tripType === "round-trip" && !returnDate)) {
      alert("Please fill in all fields correctly before searching.");
      return;
    }
    alert(`Trip Type: ${tripType}\nStart Location: ${startLocation}\nDestination: ${destination}\nDeparture: ${departureDate}\nReturn: ${returnDate}\nAdults: ${adultCount}\nChildren: ${childCount} (${childAge})\nClass: ${travelClass}\nSpecial Fare: ${specialFare}`);
  };

  const handleSwap = () => {
    setStartLocation(destination);
    setDestination(startLocation);
  };

  return (
    <div 
      className="flex flex-col items-center p-6 min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: tripType === "multi-city" ? "url('https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?s=2048x2048&w=is&k=20&c=vTEooaffdqLJKxR9syBtR9lrsCx3P67GEgrS2LcAI2w=')" : "none" }}
    >
      <h1 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
        <FaPlaneDeparture /> Book Your Flight
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-3xl">
        <div className="flex gap-4">
          <label><input type="radio" value="one-way" checked={tripType === "one-way"} onChange={() => setTripType("one-way")} /> One Way</label>
          <label><input type="radio" value="round-trip" checked={tripType === "round-trip"} onChange={() => setTripType("round-trip")} /> Round Trip</label>
          <label><input type="radio" value="multi-city" checked={tripType === "multi-city"} onChange={() => setTripType("multi-city")} /> Multi City</label>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <select className="p-2 border rounded-lg" value={startLocation} onChange={(e) => setStartLocation(e.target.value)}>
            <option value="">From</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          
          <span className="text-sm text-gray-500 cursor-pointer" onClick={handleSwap}>Swipe</span>
          
          <select className="p-2 border rounded-lg" value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">To</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="w-1/2">
            <label className="font-bold">Departure Date</label>
            <input type="date" className="p-2 border rounded-lg w-full" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          </div>
          <div className="w-1/2">
            <label className="font-bold">Return Date</label>
            <input type="date" className="p-2 border rounded-lg w-full" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select className="p-2 border rounded-lg" value={adultCount} onChange={(e) => setAdultCount(e.target.value)}>
            {[...Array(5).keys()].map(n => <option key={n+1} value={n+1}>{n+1} Adult(s)</option>)}
          </select>

          <select className="p-2 border rounded-lg" value={childCount} onChange={(e) => setChildCount(e.target.value)}>
            {[...Array(5).keys()].map(n => <option key={n} value={n}>{n} Child(ren)</option>)}
          </select>
        </div>

       

        <div className="grid grid-cols-2 gap-4">
          <select className="p-2 border rounded-lg" value={travelClass} onChange={(e) => setTravelClass(e.target.value)}>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
        </div>

        <button className="bg-blue-500 text-white font-bold p-2 rounded-lg hover:bg-blue-600" onClick={handleSearch}>Search Flights</button>
      </div>
    </div>
  );
}

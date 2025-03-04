import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const destinations = [
  { image: "/images/Editable India Boarding Pass Plane ticket.jpeg", city: "TajMahal, India" },
  { image: "/images/Editable Paris Plane Boarding Pass Ticket.jpeg", city: "Paris, France" },
  { image: "/images/download.jpeg", city: "New York, USA" },
  { image: "/images/Surprise Tokyo Boarding Pass Gift Certificate Inv.jpeg", city: "Tokyo, Japan" },
  { image: "/images/Editable Dubai Boarding Pass Plane ticket.jpeg", city: "Dubai, UAE" },
  { image: "/images/London Boarding pass printed and personalised.jpeg", city: "London, UK" },
  { image: "/images/Berlin personalised ticket, personalised boarding pass gift, surprise holiday reveal ideas, personalised plane ticket, birthday gift, ST-02.jpeg", city: "Berlin, Germany" },
];

const TravelDeals = () => {
  return (
    <section className="py-20 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-6">Popular Destinations</h2>

      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-lg overflow-hidden"
        >
          {destinations.map((dest, index) => (
            <SwiperSlide key={index} className="relative group">
              {/* Destination Image */}
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105 relative z-10"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-0 transition-opacity duration-300 group-hover:bg-opacity-50">
                <h3 className="text-white text-lg font-semibold relative z-20">{dest.city}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TravelDeals;

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import "./App.css";

import { FreeMode, Navigation, Pagination, Thumbs, Keyboard, Mousewheel, Autoplay } from "swiper/modules";

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "white",
        }}
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Pagination, Thumbs, Keyboard, Mousewheel, Autoplay]}
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper2"
        tabIndex={0} // Ensure focus for keyboard navigation
        >
          <SwiperSlide>
            <img src="/images/image 1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 6.jpg" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper">
            <SwiperSlide>
            <img src="/images/image 1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/image 6.jpg" />
          </SwiperSlide>
          </Swiper>
    </>
  )
}

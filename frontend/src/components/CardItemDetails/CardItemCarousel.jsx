import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./CardItemDetails.css";

import { Navigation } from "swiper/modules";

const CardItemCarousel = ({ images }) => {
  return (
    <>
      <Swiper
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="h-[70vh]"
      >
        {images.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <img className="w-full h-full" src={imgSrc} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CardItemCarousel;

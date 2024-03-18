import React, { useState, useEffect } from "react";

import axios from "../../axios.js";

const Carousel1 = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    axios
      .get("/getAllImagesFirstSlider")
      .then((response) => {
        setSlides(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === (slides.length - 1) ? 0 : prevSlide + 1));
    }, 10000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  const handleStart = (clientX) => {
    setTouchStartX(clientX);
    setIsSwiping(true);
  };

  const handleMove = (clientX) => {
    if (isSwiping) {
      setTouchEndX(clientX);
    }
  };

  const handleEnd = () => {
    if (isSwiping) {
      handleSwipe();
      setIsSwiping(false);
      setTouchStartX(0);
      setTouchEndX(0);
    }
  };

  const handleSwipe = () => {
    const difference = touchEndX - touchStartX;
    if (
      Math.abs(difference) > 50 &&
      parseInt(Math.abs(difference)) !== Math.abs(difference)
    ) {
      if (difference > 0) {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? (slides.length - 1) : prevSlide - 1));
      } else {
        setCurrentSlide((prevSlide) => (prevSlide === (slides.length - 1) ? 0 : prevSlide + 1));
      }
      clearInterval(intervalId);
      const newId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide === (slides.length - 1) ? 0 : prevSlide + 1));
      }, 10000);
      setIntervalId(newId);
    }
  };

  return (
    <div className="carouselFirst flex flex-col gap-[16px] mt-[16px] mx-[8.5%]">
      <div className="buttonsCarouselFirst flex justify-center">
        <div className="gap-[4px] flex justify-center w-[84%]">
          {Array.from({ length: slides.length }, (_, index) => index).map(
            (index) => (
              <div key={index} className="buttonCarouselFirst">
                <div
                  className="fill"
                  style={{
                    width: currentSlide === index ? "100%" : "0",
                    transition: currentSlide === index ? "width 10s" : "none",
                  }}
                ></div>
              </div>
            )
          )}
        </div>
      </div>
      <div
        className={`slidesCarouselFirst`}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        {slides.map((slide, index) => (
          <div
            className="slideCarouselFirst"
            style={{ display: currentSlide === index ? "block" : "none" }}
          >
            <img src={slide.imageUrl} alt="1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel1;

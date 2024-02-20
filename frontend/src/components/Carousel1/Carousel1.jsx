import React, { useState, useEffect } from "react";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/background.png";

const Carousel1 = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 3 ? 0 : prevSlide + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

    return ( 
        <div className="carouselFirst flex flex-col gap-[16px] mt-[16px] mx-[8.5%]">
            <div className="buttonsCarouselFirst flex justify-center">
                <div className="gap-[4px] flex justify-center w-[84%]">
                    {[0, 1, 2, 3].map((index) => (
                    <button
                        key={index}
                        className="buttonCarouselFirst"
                        onClick={() => {
                        setCurrentSlide(index);
                        setTimeout(() => {
                        }, 1000);
                        }}
                    >
                        <div
                        className="fill"
                        style={{
                            width: currentSlide === index ? "100%" : "0",
                            transition: currentSlide === index ? "width 10s" : "none",
                        }}
                        ></div>
                    </button>
                    ))}
                </div>
            </div>
            <div className={`slidesCarouselFirst`}>
                <div className="slideCarouselFirst" style={{ display: currentSlide === 0 ? "block" : "none" }}>
                    <img src={banner1} alt="1" />
                </div>
                <div className="slideCarouselFirst" style={{ display: currentSlide === 1 ? "block" : "none" }}>
                    <img src={banner2} alt="2" />
                </div>
                <div className="slideCarouselFirst" style={{ display: currentSlide === 2 ? "block" : "none" }}>
                    <img src={banner1} alt="3" />
                </div>
                <div className="slideCarouselFirst" style={{ display: currentSlide === 3 ? "block" : "none" }}>
                    <img src={banner2} alt="4" />
                </div>
            </div>
        </div>
     );
}
 
export default Carousel1;
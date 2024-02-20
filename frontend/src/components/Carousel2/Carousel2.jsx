import { NavLink } from "react-router-dom";
import slide from "../../images/slide.png";

const Carousel2 = () => {
    return ( 
        <>
        <div className="mt-[16px]">
            <div className="CarouselSecond flex gap-[8px]">
                <div className="CarouselSecondSlide w-full ml-[8.5%]">
                    <div className="relative ">
                        <img src={slide} alt="1" className="w-[150px] h-[210px]" />
                        <div className="bg-blue text-white px-[2px] py-[4px] flex justify-center items-center absolute top-[152px] -left-[22px]">
                        Hockey uniform
                        </div>
                    </div>
                </div>
                <div className="CarouselSecondSlide">
                    <div className="relative">
                        <img src={slide} alt="1" className="w-[150px] h-[210px]" />
                        <div className="bg-blue text-white px-[2px] py-[4px] flex justify-center items-center absolute top-[152px] -left-[22px]">
                        Hockey uniform
                        </div>
                    </div>
                </div>
                <div className="CarouselSecondSlide">
                    <div className="relative">
                        <img src={slide} alt="1" className="w-[150px] h-[210px]" />
                        <div className="bg-blue text-white px-[2px] py-[4px] flex justify-center items-center absolute top-[152px] -left-[22px]">
                            Hockey uniform
                        </div>
                    </div>
                </div>
                <div className="CarouselSecondSlide mr-[8.5%]">
                    <div className="relative">
                        <img src={slide} alt="1" className="w-[150px] h-[210px]" />
                        <div className="bg-blue text-white px-[2px] py-[4px] flex justify-center items-center absolute top-[152px] -left-[22px]">
                        Hockey uniform
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="mt-[32px] flex justify-center items-center">
            <NavLink to='/'><button className="bg-black text-white flex justify-center items-center buttonview">View all</button></NavLink>
        </div>
        </>
        
     );
}
 
export default Carousel2;
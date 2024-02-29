import { NavLink } from "react-router-dom";
import CarouselSecondSlide from "./CarouselSecondISlide";

const Carousel2 = ({caterogies}) => {

  return (
    <>
      <div className="mt-[16px]">
        <div className="CarouselSecond flex gap-[8px]">
          {caterogies.map((el) => (
            <CarouselSecondSlide
              imageSrc={el.image}
              title={el.title}
              key={el._id}
            />
          ))}
        </div>
      </div>
      <div className="mt-[32px] flex justify-center items-center">
        <NavLink to="/categories">
          <button className="bg-black text-white flex justify-center items-center buttonview">
            View all
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Carousel2;

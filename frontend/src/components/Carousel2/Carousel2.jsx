import { NavLink } from "react-router-dom";
import slide from "../../images/slide.png";
import CarouselSecondSlide from "./CarouselSecondISlide";

const Carousel2 = () => {
  const caterogies = [
    {
      id: 1,
      title: "Hockey uniform",
      image: slide,
    },
    {
      id: 2,
      title: "Football uniform",
      image: slide,
    },
    {
      id: 3,
      title: "Streetwear",
      image: slide,
    },
    {
      id: 4,
      title: "Casual",
      image: slide,
    },
    {
      id: 5,
      title: "Techno",
      image: slide,
    },
  ];

  return (
    <>
      <div className="mt-[16px]">
        <div className="CarouselSecond flex gap-[8px]">
          {caterogies.map(el => (
            <CarouselSecondSlide imageSrc={el.image} title={el.title} key={el.id} />
          ))}
        </div>
      </div>
      <div className="mt-[32px] flex justify-center items-center">
        <NavLink to="/">
          <button className="bg-black text-white flex justify-center items-center buttonview">
            View all
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Carousel2;

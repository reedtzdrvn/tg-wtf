import Carousel1 from "../Carousel1/Carousel1";
import "./home.css";
import Carousel2 from "../Carousel2/Carousel2";
import background from "../../images/background.png"

const Home = () => {
  return (
    <div className="page">
      <Carousel1 />
      <Carousel2 />
      <div className="mx-[8.5%] mt-[32px] relative">
        <img src={background} alt="1" className="imghomepage"/>
        <div className="absolute top-0 w-full text-white px-[10%] py-[12px]">
            <div className="lend flex flex-col gap-2 leading-10 font-bold">
                <div className="text-left">
                    ESPECIALLY
                </div>
                <div className="text-right">
                    FOR YOU
                </div>
            </div>
        </div>
      </div>
      <div className="textlendunder mx-[8.5%] mt-[8px] text-center">
        *We can do everything and even more. If something is not in our catalog, you can always place a special order.
      </div>
    </div>
  );
};

export default Home;

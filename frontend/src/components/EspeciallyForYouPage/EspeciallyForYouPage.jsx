import background from "../../images/background.png";
import "./EspeciallyForYouPage.css";

const EspeciallyForYouPage = () => {
  return (
    <div className="page">
      <div className="mx-[8.5%] mt-[32px] relative">
        <img src={background} alt="1" className="imgbanner" />
        <div className="absolute top-0 bottom-0 w-full text-white px-[10%] py-[12px] h-max">
          <div className="lend flex flex-col gap-2 leading-10 font-bold">
            <div className="text-left">ESPECIALLY</div>
            <div className="text-right">FOR YOU</div>
          </div>
        </div>
        <div className="input-1 flex justify-center mt-[32px]">
            <div className="w-[90%]">
            <label htmlFor="name">Present Address</label>
            <input type="text" id="name"/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EspeciallyForYouPage;

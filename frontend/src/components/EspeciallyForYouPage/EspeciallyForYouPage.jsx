import background1 from "../images/background1.png"

const EspPage = () => {
    return (
        <div className="page">
        <div className="mx-[8.5%] mt-[32px] relative">
          <img src={background} alt="1" className="imgbanner"/>
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
    </div>
    );
};

export default EspeciallyForYouPage;